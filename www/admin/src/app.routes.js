admin.config([
  '$routeProvider',
  ($routeProvider) => {
    const base = `${document.baseURI}/src/components`;
    $routeProvider.caseInsensitiveMatch = false;
    $routeProvider
      .eagerInstantiationEnabled(true)
      .when('/auth/login/', {
        templateUrl: `${base}/auth/auth.tpl.html`,
        controller: "Authenticate",
        controllerAs: "auth"
      })
      .otherwise("/auth/login/");
}])
