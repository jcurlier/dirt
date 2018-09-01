import * as Web3 from 'web3';
import { IWeb3ContextConfiguration, Web3Context, IContractProvider, IWeb3Context } from './Web3Context';
import { Token, Registry, RegistryTypes, RegistryType, RootRegistry, IContractConfiguration, IContract, Parameters, KnownClasses, KnownCoreParameters } from '../contracts';

export interface IDirtConfiguration {
    rootAddress?: string;
    rootContractName?: string;
    trace?: boolean;
    web3: IWeb3ContextConfiguration;
    contractProvider?: IContractProvider;
}

export class DirtTrace {

    constructor(public enabled: boolean, private parent: Dirt, private scope: string) {
        this.enabled = enabled;
    }

    message(message: string): DirtTrace {
        if (!this.enabled) {
            return this;
        }

        console.log(this.prefix() + (message == null ? '<null>' : message));
        return this;
    }

    object(object: any): DirtTrace {
        if (!this.enabled) {
            return this;
        }

        if (typeof object == 'string') {
            this.message(object);
        }

        console.log(this.prefix());
        console.dir(object == null ? '<null>' : object);
        return this;
    }

    error(error: any): DirtTrace {
        if (!this.enabled) {
            return this;
        }

        console.error(this.prefix());
        console.error(error == null ? '<null error>' : error);
        return this;
    }

    async promise(promise: () => Promise<any>): Promise<DirtTrace> {
        if (!this.enabled) {
            return this;
        }

        let res = null;
        try {
            res = await promise();
        }
        catch (e) {
            this.error(e);
            return this;
        }

        this.object(res);
        return this;
    }

    function(func: Function): DirtTrace {
        if (!this.enabled) {
            return this;
        }

        let res = func();
        this.object(res);

        return this;
    }

    private prefix(): string {
        const date = new Date();
        const dateString = date.toLocaleTimeString();
        return `[${dateString}] ${this.scope} [From=${this.parent.defaultAccount()}] `
    }

    public create(scope: string): DirtTrace {
        return new DirtTrace(this.enabled, this.parent, scope);
    }
}

export class Dirt implements IWeb3Context {

    public Parameters: Parameters;
    public Token: Token;
    public Root: RootRegistry;

    public web3: Web3;
    public trace: DirtTrace;

    private context: Web3Context;

    constructor(private configuration: IDirtConfiguration) {
        this.context = new Web3Context(configuration.web3, configuration.contractProvider);
        this.web3 = this.context.web3;
        this.trace = new DirtTrace(configuration.trace || false, this, `DIRT`);
    }

    async getRegistryAtAddress<T extends Registry<any>>(address: string, type: RegistryType): Promise<T> {
        return this.getContract<T>({
            address: address,
            name: type,
            type: RegistryTypes[type]
        });
    }

    getContract<T extends IContract>(config: IContractConfiguration): Promise<T> {
        return this.context.getContract<T>(config, this);
    }

    defaultAccount() {
        return this.context.defaultAccount();
    }

    private async load() {
        // Load the root repository, from this we can discover the rest of the 
        // static contracts we need

        this.Root = await this.getContract<RootRegistry>(
            {
                address: this.configuration.rootAddress,
                type: RootRegistry,
                name: this.configuration.rootContractName || "RootRegistry"
            });

        // Load parameters contract to discover everything else 
        this.Parameters = await this.getContract<Parameters>(
            {
                address: this.Root.addresses.parameters,
                type: Parameters,
                name: "Parameters"
            }
        );

        // Load the token singleton 
        this.Token = await this.getContract<Token>(
            {
                address: await this.Parameters.getAddress(KnownClasses.CORE, KnownCoreParameters.TOKEN),
                type: Token,
                name: "ProtocolToken"
            });
    }

    static async create(configuration: IDirtConfiguration): Promise<Dirt> {
        // Yuck;
        let dirt = new Dirt(configuration);
        await dirt.load()
        return dirt;
    }
}