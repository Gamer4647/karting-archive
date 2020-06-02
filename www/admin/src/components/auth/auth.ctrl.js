admin.controller(
  'Authenticate', [
  function Authenticate() {
    this.submitable = true;
    this.username = String();
    this.password = String();
    this.rememberable = true;
    this.rememberme = false;
    this.submit = ''; 
}]);
