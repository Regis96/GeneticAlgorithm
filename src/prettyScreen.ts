var blessed = require('blessed');

export class PrettyScreen{
    screen;
    box;

    constructor(){
        this.screen = blessed.screen({
            smartCSR: true
        });
        
        this.box = blessed.box({
            width: '100%',
            height: '100%',
            tags: true,
            style: {
                bg: 'white',
            }
        });

        this.screen.append(this.box);

        this.screen.key(['escape', 'q', 'C-c'], function(ch, key) {
            return process.exit(0);
        });


        this.box.focus();
    }

    on(key,callback){
        this.screen.key(key, function(ch, key){
            callback();            
        });
    }
    
    print(content){
        this.box.setContent('{bold}{black-fg}' + content + '{/black-fg}{/bold}');
        this.screen.render();
    }

    appendToScreen(content){
        this.box.insertBottom('{bold}{black-fg}' + content + '{/black-fg}{/bold}');
    }    
}