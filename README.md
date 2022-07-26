# IDEA

create a `db:reset` or `db:prepare` or `db:reseed` or `db:whatever` script that resets `wovoka_dev` and maybe even creates a `wovoka_[template/seed/base]` or something like that. Then, in testing, each test can have a `beforeEach` that runs:

```
DROP DATABASE wovoka_test;
CREATE DATABASE wovoka_test TEMPLATE wovoka_[dev/template/seed];
```

Then you run the test. Any process that connects to the database will have the same data. Race conditions would still exist between processes, but those can be `await`ed in tests. This would allow me to avoid the problem of creating a shareable process that would share the transaction-aware client.

Although I'm now realizing that I will likely be connected to wovoka_test and dropping it at the same time...