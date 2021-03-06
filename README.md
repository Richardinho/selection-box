# Selection Box

Javascript plugin which builds an html super-structure on top of native html select boxes allowing for
greater styling flexibility than is possible with native select elements.

##  Running Nightwatch tests


### Run Selenium server

``` cd bin``` cd into folder is where selenium Jar is stored

``` java -jar selenium-server-standalone-{VERSION}.jar```


###  Run Nightwatch

``` npm run behavioural ```

####  Selenium console found at

```http://localhost:4444/wd/hub/static/resource/hub.html```

## Requirements

- Should work exactly in the same way as a native select element
- Should work on as many browsers/device as possible
- Should provide fallback for non supporting browsers/devices
- Should be usable by screen readers
- Should be usable using keyboard
- Should have a suite of unit and behavioural tests
- Should support searching for options by typing initial characters

Todo:
- research how to style native select element
- catalogue entire list of behaviours of select element
- research correct aria roles for select box
- learn to use a screen reader
- best way of handling keyevents
- How to run tests across multiple browsers

### Resources
- [w3c wai-aria guidelines for list box](https://www.w3.org/TR/wai-aria-practices/#Listbox)
- [whatwg html spec for select element](https://html.spec.whatwg.org/multipage/form-elements.html#the-select-element)
- [stack overflow question relating to styling of select box](https://stackoverflow.com/questions/1895476/how-to-style-a-select-dropdown-with-css-only-without-javascript)
-[Codepen: custom select box with CSS styling](https://codepen.io/ericrasch/pen/zjDBx)






