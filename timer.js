class Timer {
    constructor (delay, cb) {
        this.delay = delay;
        this.cb = cb;
    }

    start(){
        this.startTime = Date.now();
        this.nextTime = this.startTime + this.delay;
        // console.log('StartTime:',this.startTime);
        // console.log('NextTime:',this.nextTime);
        // let mythis = this;
        setInterval(this.update.bind(this),5);
        
    }

    print(){
        console.log('StartTime:',this.startTime);
        console.log('NextTime:',this.nextTime);
    }

    update(){
        let curTime = Date.now();
        // console.log('Update called', curTime, this.nextTime);
        if(curTime >= this.nextTime) {
            // console.log('calls');
            this.cb();
            this.nextTime = this.nextTime + this.delay;
        }else {
            // console.log(curTime, 'Not Greater',this.nextTime);
            
        }
    }
}

module.exports = Timer;