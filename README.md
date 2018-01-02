# LiveReload Server

[LiveReload](http://livereload.com/) static file server that also injects [livereload-js](https://github.com/livereload/livereload-js) into any HTML files.

## Installation

```bash
npm install @brett_langdon/lrserver
```

## Usage

```
$ lrserver --help
lrserver

Positionals:
  serve  The directory to serve static files from                       [string]

Options:
  --help        Show help                                              [boolean]
  --version     Show version number                                    [boolean]
  --bind, -b    Host/port for static server to bind to
                                            [string] [default: "127.0.0.1:3000"]
  --lrbind, -l  Host/port for LiveReload to bind to
                                           [string] [default: "127.0.0.1:35729"]
  --watch, -w   Directory to watch for changes                           [array]
```

```bash
# Use default settings and serve static files from current directory
lrserver

# Explicitly set the path to serve files from
lrserver path/to/files/

# Explicitly set the directory to watch and path to serve files from
lrserver --watch path/to/watch/ path/to/files/

# Setting multiple paths to watch
lrserver --watch path/1/ --watch path/2/ path/to/files/

# Change the port the static server binds to
lrserver --bind '0.0.0.0:3000'

# Change the port the LiveReload server binds to
lrserver --lrbind '0.0.0.0:35729'
```
