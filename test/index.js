import {expect} from "chai";
import decamelizeKeysDeep from '../index.js'

describe("decamelizeKeysDeep", () => {
  it("should deeply decamelize the keys of a JSON object", () => {
    const aDate = new Date(2016, 3, 15);
    const json = {
      unicornRainbow: {
        fooBar: 1,
        aDate: aDate,
        anArray: [1, 2, {fooBar: 3}]
      }
    };
    expect(decamelizeKeysDeep(json)).to.be.deep.equal({
      unicorn_rainbow: {
        foo_bar: 1,
        a_date: aDate,
        an_array: [1, 2, {foo_bar: 3}]
      }
    });
  });

  it("should raise if decamelized key would overwrite existing key of the JSON object", () => {
    let json = {unicornRainbow: {fooBar: 1, foo_bar: 2}};
    expect(function() {
      decamelizeKeysDeep(json);
    }).to.throw();

    json = {foo: 1}
    expect(function() {
      decamelizeKeysDeep(json);
    }).to.not.throw();
  });

});

