# oer-metadata-editor

This is a prototypish metadata-editor based on [LRMI](https://www.dublincore.org/specifications/lrmi/).

The idea was not to hardcode the specified vocabulary, but to 
get it directly from the [Specification](https://www.dublincore.org/specifications/lrmi/lrmi_terms/).
This is done via an Flask-API, which you can have a look at [here](https://github.com/sroertgen/oer-flask-api).

I also wanted to include the ability to make references to frameworks, e.g.
so that teachers can directly reference material to certain competence frameworks.
So the editor also gets frameworks informations from the API.
The frameworks are defined using the [CASE](http://www.imsglobal.org/case) standard 
with the tool [OpenSalt](https://github.com/opensalt).
You can check a test-instance [here](http://141.5.108.59:3000).

You can then put the informations out as [JSON-LD](https://json-ld.org/) and
for example include it in the `<head>`-tag of your web page.

You can also put the entry to an ElasticSearch-index.

This is all pre-alpha and to be seen as a PoC. Needs more testing.

## Docker setup

If you want to test it out, just [install Docker](https://docs.docker.com/get-docker/).
After that go into project root and run `docker-compose up`.

This will pull the oer-flask-api container from Docker-Hub (https://hub.docker.com/repository/docker/laocoon667/oer-flask-api)
and build the metadata-editor from the Dockerfile.

After a while your api is available at port 5000 and your editor at port 80.
Just go to <http://localhost> and check it out.

## Project setup for developing
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
