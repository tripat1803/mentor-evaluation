export class Ideation{
    constructor(ideation, execution, pitch, viva){
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
}