'use strict';

class Language{
    constructor (content){
        this._name = content.name;
        this._status = content.config;
        this._content = content;
    }
    get name () {
        return this._name;
    }
    get status () {
        return this._status;
    }
    set name (name) {
        this._name = _name;
        this._status = true;
    }
    get content () {
        let content;
        switch (this._name) {
            case 'Pt':
                content = this._content.Pt;
                break;
            case 'Fr':
                content = this._content.Fr;
                break;
            default:
                content = this._content.Eng;
                break;
        }
        return content;
    }
}

module.exports = Language