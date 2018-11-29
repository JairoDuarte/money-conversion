'use strict';

class Language{
    constructor (content = {}){
        this._name = content.language || '';
        this._status = content.config || false;
        this._content = content[this._name];
    }
    
    get name () {
        return this._name;
    }
    get status () {
        return this._status;
    }
    set name (name) {
        this._name = name;
        this._status = true;
    }
    set status(status){
        this._status = status;
    }
    get content () {
        return this._content;
    }
        
}

module.exports = Language