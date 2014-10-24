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

## Example Output

### Start of Wiki Page
![Start of Wiki Page](https://raw.github.com/jhitchcock/raml2wiki/master/wikiExample1.png)

### Example Endpoint Section
![Example Endpoint](https://raw.github.com/jhitchcock/raml2wiki/master/wikiExample2.png)


This script uses the parsing method and raml2obj script by Kevin Renskers 
(https://github.com/kevinrenskers/raml2obj)
(https://github.com/kevinrenskers/raml2md)

