-- CREATE public.item;

CREATE TABLE items (
	"key" text NOT NULL,
	value text NOT NULL,
	owner text NOT NULL,
	blockhistory integer[] NULL,
	"date" timestamptz NOT NULL,
	stake text NOT NULL,
	registryaddress text NULL,
	CONSTRAINT item_pkey PRIMARY KEY ("key")
);

-- CREATE public.registry;

CREATE TABLE registries (
	address text NOT NULL,
	"name" text NOT NULL,
	votestyle text NOT NULL,
	"date" timestamptz NOT NULL,
	CONSTRAINT registry_pkey PRIMARY KEY (address)
);
