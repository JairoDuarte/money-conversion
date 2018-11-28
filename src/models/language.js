class language{
    constructor (content){
        this.name = content.language;
        this.status = content.config;
        this.content = content;
    }
    get name () {
        return this.name;
    }
    get status () {
        return this.status;
    }
    set name (name) {
        this.name = name;
        this.status = true;
    }
    get content () {
        let _content;
        switch (this.name) {
            case 'Pt':
                _content = this.content.Pt;
                break;
            case 'Fr':
                _content = this.content.Fr;
                break;
            default:
                _content = this.content.Eng;
                break;
        }
        return _content;
    }
}