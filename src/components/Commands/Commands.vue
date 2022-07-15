<template>
  <aside class="commands">
    <button
      type="button"
      @click="generateDataAdd"
    >
      Добавить
    </button>
    <button
      type="button"
      @click="generateDataDelete"
    >
      Удалить
    </button>
  </aside> 
  <Dialog
    v-if="dialog.isShown"
    :header="dialog.header"
    :content-text="dialog.contentText"
    :elements="dialog.elements"
    :footer="dialog.footer"
  />
</template>

<script>
import "./commands.css";
import { action } from '../../actions/';
import { useState } from "../../store/index";
import Dialog from "../Common/Dialog/Dialog";

export default {
    name: "CommandsComponent",
    components: {
        Dialog,
    },
    props: {
        changeLoading:{
            type: Function,
            required: true
        }
    },
    setup() {
        const state = useState();
        return { state };
    },
    data() {
        return {
            dialog: {
                isShown: false,
                header: "",
                contentText: "",
                footer: [],
                elements:[],
            },
        };
    },
    methods: {
        async addEmployee() {
            const {fullName, salary, age} = this.state.employee;
            if(fullName.trim() && salary.trim() && age.trim()){
                // const data = {
                //     employee_name: fullName.trim(),
                //     employee_salary: salary.trim(),
                //     employee_age: age.trim()
                // }
                const response = await action(this.changeLoading, '/create', 'post');
                if(response.data){
                    this.state.employees.push({
                        employee_age: age.trim(),
                        employee_name: fullName.trim(),
                        employee_salary: salary.trim(),
                        id: response.data.id
                    });
                    this.closeDialog()
                }else{
                    this.dialog.header = "Ошибка";
                    this.dialog.contentText = "Не удалось сохранить данные";
                    this.dialog.footer = [{name: "Закрыть", action: this.closeDialog, type: "button"}];
                }
            }
        },
        async removeEmployee() {
            const response = await action(this.changeLoading, `/delete/${this.state.activeRowId}`, 'delete');
            if(response.data){
                this.state.employees = this.state.employees.filter((item) => (item.id !== +response.data))
                this.state.activeRowId = 0;
                this.closeDialog()
            }else{
                this.dialog.header = "Ошибка";
                this.dialog.contentText = "Не удалось удалить данные";
                this.dialog.footer = [{name: "Закрыть", action: this.closeDialog, type: "button"}];
            }
        },
        generateDataAdd() {
            this.dialog.isShown = true;
            this.dialog.header = "Добавить сотрудника";
            this.dialog.contentText = "";
            this.dialog.elements = [{
                name: 'ФИО',
                alias: 'fullName',
                value: this.state.employee.fullName,
                type: 'text',
                method: this.inputHandler
            },{
                name: 'ЗП',
                alias: 'salary',
                value: this.state.employee.salary,
                type: 'number',
                method: this.inputHandler
            },{
                name: 'Возраст',
                alias: 'age',
                value: this.state.employee.age,
                type: 'number',
                method: this.inputHandler
            }]
            this.dialog.footer = [
                {name: "Сохранить", action: this.addEmployee, type: "submit"},
                {name: "Закрыть", action: this.closeDialog, type: "button"}
            ];
        },
        generateDataDelete() {
            if(this.state.activeRowId){
                this.dialog.isShown = true;
                this.dialog.header = "Удалить сотрудника";
                this.dialog.contentText = "Вы действительно хотите удалить сотрудника из списка?";
                this.dialog.footer = [
                    {name: "Удалить", action: this.removeEmployee, type: "submit"},
                    {name: "Закрыть", action: this.closeDialog, type: "button"}
                ];
            }else{
                this.dialog.isShown = true;
                this.dialog.header = "Сотрудник не выбран";
                this.dialog.contentText = "Выберите сотрудника для удаления";
                this.dialog.footer = [
                    {name: "Закрыть", action: this.closeDialog, type: "button"}
                ];
            }
        },


        inputHandler(event){
            const {currentTarget} = event;
            const {name, value} = currentTarget;
            this.state.employee[name] = value;
        },
        clearState(){
            this.state.employee.fullName = '';
            this.state.employee.salary = '';
            this.state.employee.age = '';
        },
        closeDialog() {
            this.clearState();
            this.dialog.isShown = false;
        },
    },
};
</script>
