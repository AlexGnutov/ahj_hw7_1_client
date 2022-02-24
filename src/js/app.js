import Helpdesk from './helpdesk/helpdesk';

window.onload = async () => {
  const container = document.getElementById('container');
  // Add help desk on page
  // eslint-disable-next-line no-unused-vars
  const helpDesk = new Helpdesk(container);
};
