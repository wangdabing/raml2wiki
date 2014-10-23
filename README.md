# RAML to WIKI

A simple RAML to Wiki (Confluence / JIRA Markup) documentation generator, written for Node.js.

## Confluence / Jira wiki Process

Output can be pasted into Confluence, using the Insert Markup feature; 


![Wiki menu](https://raw.github.com/jhitchcock/raml2wiki/master/wikimenu.png)

![Wiki insert](https://raw.github.com/jhitchcock/raml2wiki/master/wikiinsert.png)


## Install
```
npm i -g raml2wiki
```


## Usage

### As a command line script

```
raml2wiki example.raml > example.txt
raml2wiki -i example.raml -o example.txt
raml2wiki -s -i example.raml -o example.txt
```

Using your own templates:

```
raml2txt -t custom-template.handlebars -r custom-resource.handlebars -m custom-item.handlebars -i example.raml -o example.txt
```




This is based on the RAML to md generator by Kevin Renskers here: (https://github.com/kevinrenskers/raml2md) 

