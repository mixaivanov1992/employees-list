import { inject, provide, reactive } from 'vue';
export const stateSymbol = Symbol('state');
export const createState = () => reactive({
    activeRowId: 0,
    employees: [],
    employee:{
        fullName: '',
        salary: '',
        age: '',
    }
});

export const useState = () => inject(stateSymbol);
export const provideState = () => provide(
    stateSymbol, 
    createState()
);