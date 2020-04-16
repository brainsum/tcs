/**
 * @file
 * Custom scripts for article moderation buttons.
 */

(function ($, Drupal) {
  "use strict";

  Drupal.behaviors.paradeDomainPathAlias = {
    attach: function () {
      const $form = $("form.node-parade-onepage-edit-form");
      const $domainSource = $("select[name='field_domain_source']");
      const $paradeDomainPathAlias = $("input[name='parade_domain_path_alias']");

      /*$paradeDomainPathAlias.once("paradeDomainPathAlias").change(function () {
        console.log($(this).val());
        var domain = $domainSource.val();
        console.log(domain);
        $("input[name='domain_path[" + domain + "]']").val($(this).val());
      });*/
      $form.once("paradeDomainPathAlias").submit(function () {
        console.log($paradeDomainPathAlias.val());
        var domain = $domainSource.val();
        console.log(domain);
        // Empty all domain path aliases.
        $("input[name^='domain_path[']").val("");
        // Set alias for selected domain.
        $("input[name='domain_path[" + domain + "]']").val($paradeDomainPathAlias.val());
      });
    }
  }
})(jQuery, Drupal);
