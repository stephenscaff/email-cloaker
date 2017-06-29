/**
 * Email Cloaker
 * Converts a written out email address to an actual email address.
 * @author Stephen Scaff
 */
var EmailCloaker = (function() {

  // Our Selector
  var cloakedEmails = document.querySelectorAll('.js-email-cloak');

  /**
   * ForEach Utility
   * @author Todd Motto
   * @see https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/
   */
  var forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
      callback.call(scope, i, array[i]); // passes back stuff we need
    }
  };
  
  return{
     
    /**
     * Init
     */
    init: function(){
      this.replacers();
    },

        
    /**
     * Replacers
     * Replaces ats and dots and builds an actual email address
     */
    replacers: function(){
      
      //console.log(cloakedEmails);
      forEach(cloakedEmails, function (index, cloakedEmail) {
        
        var finalEmail, i, ats, dots, moreDots;
        
        ats = [ ' at ', ' (at) ', ' [at] ' ];
        dots = [ ' dot ', ' (dot) ', ' [dot] ' ];
        
        finalEmail = cloakedEmail.innerHTML;

        // Replace Ats
        for ( i = 0; i < ats.length; i++ ) {
          finalEmail = finalEmail.replace(ats[i], '@');
        }
        
        // replace Dots
        for ( i = 0; i < dots.length; i++ ) {
          finalEmail = finalEmail.replace(dots[i], '.');

          moreDots = [];
          moreDots = finalEmail.split(dots[i]);
          // Got more dots?
          for ( var j = 1; j < moreDots.length; j++ ) {
            finalEmail = finalEmail.replace(dots[i], '.');
          }
        }
        
        cloakedEmail.innerHTML = finalEmail;
      });
    },
  };
 })();
EmailCloaker.init();