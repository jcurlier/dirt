import { Registry, RegistryItem } from './Registry';
export declare class SimpleRegistry extends Registry<RegistryItem> {
    item(key: string): Promise<RegistryItem>;
    itemAtIndex(index: number): Promise<RegistryItem>;
    addItem(key: string, value: string): Promise<RegistryItem>;
    editItem(key: string, value: string): Promise<RegistryItem>;
    deleteItem(key: string): Promise<boolean>;
    private unpack(value);
}
