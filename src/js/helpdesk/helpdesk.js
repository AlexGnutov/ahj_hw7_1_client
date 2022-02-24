import View from '../view/view';
// import TicketServiceLocal from '../ticket-service/ticket-service-local';
import Controller from '../controller/controller';
import TicketServiceWeb from '../ticket-service/ticket-service-web';

export default class Helpdesk {
  constructor(target) {
    // this.service = new TicketServiceLocal('');
    this.service = new TicketServiceWeb('https://ahjhw71server.herokuapp.com/');
    this.view = new View();
    this.controller = new Controller(this.view, this.service);
    target.appendChild(this.view.html());
  }
}
