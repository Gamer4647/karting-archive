admin
.config(["$locationProvider", "$httpProvider",
  function ($locationProvider, $httpProvider) {
    $locationProvider.hashPrefix("!/api").html5Mode(false);
    $httpProvider.useApplyAsync(true);
    $httpProvider.defaults.headers.common = {
      "Accept": "application/json;q=0.9,*/*;q=0.0",
      "X-Requested-With": "XMLHttpRequest",
      "X-Push-State-Request": false
    };
    $httpProvider.defaults.xsrfCookieName = "TOKEN";
    $httpProvider.defaults.xsrfHeaderName = "Authorization";
    const port = Number(document.location.port) || false,
          protocol = String(document.location.protocol);
    if (port === 10070 || port === 10071) {
      $httpProvider.xsrfWhitelistedOrigins.push(
        `${protocol}//${document.domain}:10070`,
        `https://${document.domain}:10071`
      );
    } else if (port === 10060 || port === 10061) {
      $httpProvider.xsrfWhitelistedOrigins.push(
        `${protocol}//${document.domain}:10060`,
        `https://${document.domain}:10061`
      );
    } else {
      $httpProvider.xsrfWhitelistedOrigins.push(
        `${protocol}//${document.domain}`,
        `https://${document.domain}`
      );
    }
}])
.config(["$sceProvider", "$sceDelegateProvider", "$httpProvider",
  function ($sceProvider, $sceDelegateProvider, $httpProvider) {
    const baseHref = angular.element("[data-scoped]"),
          scopedURI = String(baseHref.attr("data-scoped")),
          origins = $httpProvider.xsrfWhitelistedOrigins;
    let whitedlisted = [], blacklisted = [];
    $sceProvider.enabled(true);
    for (const orgin of origins) {
      if (Array.isArray(whitedlisted))
        whitedlisted.push(`${orgin}${scopedURI}/**`);
      if (Array.isArray(blacklisted))
        for (const rule of [".", "bower", "composer", "vendor"]) {
          blacklisted.push(`${orgin}${scopedURI}/${rule}**`);
        }
    }
    $sceDelegateProvider.resourceUrlWhitelist(whitedlisted);
    $sceDelegateProvider.resourceUrlBlacklist(blacklisted);
}])
.config(["$interpolateProvider", "$templateRequestProvider",
  function ($interpolateProvider, $templateRequestProvider) {
    $interpolateProvider.startSymbol("{%").endSymbol("%}");
    $templateRequestProvider.httpOptions({
      method: "GET", cache: true, headers: {
        "Accept": "text/html;q=0.9,*/*;q=0.0",
        "X-Push-State-Request": true
      }
    });
}])
.config(["$logProvider", "$qProvider", "$compileProvider",
  function ($logProvider, $qProvider, $compileProvider) {
    const config = JSON.parse(
      angular.element("[name=__INITIAL_STATE__]").val()
    );
    if (config.debug_enabled === undefined)
      config.debug_enabled = false;
    const base = document.baseURI.replace(/\./gui, "\\."),
          aHrefSanitizedWhitelist = RegExp(`${base}/`)
          imgSrcSanitizedWhitelist = RegExp(`${base}/assets/`)
          debug_enabled = Boolean(config.debug_enabled);
    $logProvider.debugEnabled(debug_enabled);
    $qProvider.errorOnUnhandledRejections(debug_enabled);
    $compileProvider.debugInfoEnabled(debug_enabled)
    .aHrefSanitizationWhitelist(aHrefSanitizedWhitelist)
    .imgSrcSanitizationWhitelist(imgSrcSanitizedWhitelist)
    .strictComponentBindingsEnabled(true)
    .onChangesTtl(debug_enabled? 2: 4)
    .commentDirectivesEnabled(false)
    .cssClassDirectivesEnabled(false);
}])
