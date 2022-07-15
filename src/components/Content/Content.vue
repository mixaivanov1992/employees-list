<template>
  <main class="content">
    <Dialog
      v-if="dialog.isShown"
      header="Редактировать данные"
      :content-text="dialog.contentText"
      :elements="([{
        name: 'ФИО',
        alias: 'fullName',
        value: state.employee.fullName,
        type: 'text',
        method: inputHandler
      },{
        name: 'ЗП',
        alias: 'salary',
        value: state.employee.salary,
        type: 'number',
        method: inputHandler
      },{
        name: 'Возраст',
        alias: 'age',
        value: state.employee.age,
        type: 'number',
        method: inputHandler
      }])"
      :footer="dialog.footer"
    />
    <table>
      <tr>
        <th>ФИО</th>
        <th>ЗП</th>
        <th>Возраст</th>
      </tr>
      <tr
        v-for="(value, index) in state.employees"
        :key="index"
        :data-id="value.id"
        @dblclick="activatedRow"
        @click="selectedRow"
      >
        <td>{{ value.employee_name }}</td>
        <td>{{ value.employee_salary }}</td>
        <td>{{ value.employee_age }}</td>
      </tr>
    </table>
  </main>
</template>

<script>
import './content.css';
import { action } from '../../actions/';
import { useState } from "../../store/";
import Dialog from '../Common/Dialog/Dialog';

export default {
    name: 'ContentComponent',
    components: {
        Dialog
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
                footer: [],
            }
        };
    },
    async mounted() {
        const response = await action(this.changeLoading, '/employees', 'get');
        this.state.employees = response.data || [];
    },
    methods: {
        selectedRow(event){
            const row = event.currentTarget;
            const rows = row.parentNode.children;

            for(const item of rows){
                item.classList.remove('selected-row');
            }

            row.classList.add('selected-row');
            this.state.activeRowId = row.dataset.id;
        },
        async activatedRow() {
            const response = await action(this.changeLoading, `/employee/${this.state.activeRowId}`, 'get');

            if(response.data){
                const {employee_name, employee_salary, employee_age} = response.data;
                this.state.employee.fullName = employee_name;
                this.state.employee.salary = employee_salary.toString();
                this.state.employee.age = employee_age.toString();

                this.dialog.contentText = "";
                this.dialog.footer = [
                    {name: "Сохранить", action: this.editEmployee, type: "submit"},
                    {name: "Закрыть", action: this.closeDialog, type: "button"}
                ];
            }else{
                this.dialog.contentText = "Не удалось загрузить данные";
                this.dialog.footer = [
                    {name: "Закрыть", action: this.closeDialog, type: "button"}
                ];
            }
            this.dialog.isShown = true;
        },
        async editEmployee() {
            const {fullName, salary, age} = this.state.employee;
            if(fullName.trim() && salary.trim() && age.trim()){
                // const data = {
                //     employee_name: fullName.trim(),
                //     employee_salary: salary.trim(),
                //     employee_age: age.trim()
                // }
                const response = await action(this.changeLoading, `/update/${this.state.activeRowId}`, 'put');
                if(response.data){
                    this.state.employees = this.state.employees.map((item)=>{
                        if(item.id === +this.state.activeRowId){
                            item.employee_age = age.trim();
                            item.employee_name = fullName.trim();
                            item.employee_salary = salary.trim();
                        }
                        return item;
                    })
                    this.closeDialog()
                }else{
                    this.dialog.contentText = "Не удалось сохранить данные";
                    this.dialog.footer = [{name: "Закрыть", action: this.closeDialog, type: "button"}];
                }
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
        closeDialog () {
            this.clearState();
            this.dialog.isShown = false;
        },
    },
}
</script>
