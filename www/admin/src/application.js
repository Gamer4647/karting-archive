for (const src of [
  "/bower_components/angular-route/angular-route.min.js",
  "/src/app.module.js",
  "/src/app.config.js",
  "/src/app.routes.js",
  "/src/components/auth/auth.ctrl.js"
]) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.charset = 'UTF-8';
  script.defer = true;
  script.src = `${document.baseURI}${src}`;
  document.body.insertBefore(script, null);
}
document.addEventListener('readystatechange',
  function ngBootstrap(event) {
    if (document.readyState !== 'complete') return;
    event.target.removeEventListener(
      'readystatechange', ngBootstrap
    );
    angular.bootstrap(
      document, ['admin'], { strictDi: true }
    );
  }
);
