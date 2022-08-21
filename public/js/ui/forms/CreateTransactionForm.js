/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(null, (err, resp) => {
      if (resp && resp.data) {        
        resp.data.forEach((el) => {
          document.querySelectorAll('.accounts-select').forEach((e) => {
            e.insertAdjacentHTML('beforeend', 
            `<option value="${el.id}">${el.name}</option>`)
          })         
        })       
      }
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, resp) => {
      if (resp && resp.success) {
        this.element.reset();
        App.update();
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();        
      }
    });
  }
}