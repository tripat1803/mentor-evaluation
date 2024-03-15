class Ideation{
    constructor(ideation, execution, pitch, viva){
        if(ideation < 0 || execution < 0 || pitch < 0 || viva < 0) throw Error("Invalid input");
        if(ideation > 10 || execution > 10 || pitch > 10 || viva > 10) throw Error("Invalid input");
        this.ideation = ideation;
        this.execution = execution;
        this.pitch = pitch;
        this.viva = viva;
    }

    getAttributes(){
        return {
            ideation: this.ideation,
            execution: this.execution,
            pitch: this.pitch,
            viva: this.viva,
        }
    }

    setIdeation(ideation){
        if(ideation){
            this.ideation = ideation;
            return;
        }
        this.ideation = 0;
    }
    setExecution(execution){
        if(execution){
            this.execution = execution;
            return;
        }
        this.execution = 0;
    }
    setPitch(pitch){
        if(pitch){
            this.pitch = pitch;
            return;
        }
        this.pitch = 0;
    }
    setViva(viva){
        if(viva){
            this.viva = viva;
            return;
        }
        this.viva = 0;
    }
}

module.exports = Ideation;