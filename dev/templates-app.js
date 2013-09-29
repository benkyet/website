angular.module('templates-app', ['account/account.tpl.html', 'home/home.tpl.html', 'item/item.tpl.html', 'login/login.tpl.html', 'signup/partials/step_1.tpl.html', 'signup/partials/step_2.tpl.html', 'signup/signup.tpl.html']);

angular.module("account/account.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("account/account.tpl.html",
    "<br>\n" +
    "<section class=\"account\">\n" +
    "\n" +
    "    <button\n" +
    "            class=\"btn btn--gray\"\n" +
    "            ng-click=\"isAddingItem = true; isUpdatingAccount = false;\">Add Item</button>\n" +
    "    <button\n" +
    "            class=\"btn btn--gray\"\n" +
    "            ng-click=\"isUpdatingAccount = true; isAddingItem = false;\">Update Account</button>\n" +
    "\n" +
    "        <form\n" +
    "                name=\"updateAccountForm\"\n" +
    "                class=\"form form--blue lyt--update-account-form\"\n" +
    "                ng-submit=\"updateUser();\"\n" +
    "                ng-show=\"isUpdatingAccount === true;\">\n" +
    "            <div>\n" +
    "                <input\n" +
    "                        required\n" +
    "                        ng-model=\"current.username\"\n" +
    "                        type=\"text\"\n" +
    "                        placeholder=\"Username\"\n" +
    "                        class=\"ipt ipt--single center\">\n" +
    "                <input\n" +
    "                        required\n" +
    "                        ng-model=\"current.email\"\n" +
    "                        type=\"text\"\n" +
    "                        placeholder=\"Email\"\n" +
    "                        class=\"ipt ipt--single center\">\n" +
    "                <input\n" +
    "                        required\n" +
    "                        ng-init=\"current.pass = ''\"\n" +
    "                        ng-model=\"current.pass\"\n" +
    "                        type=\"password\"\n" +
    "                        placeholder=\"Change password\"\n" +
    "                        class=\"ipt ipt--single center\">\n" +
    "                <input\n" +
    "                        required\n" +
    "                        ng-init=\"current.confirm = ''\"\n" +
    "                        ng-model=\"current.confirm\"\n" +
    "                        type=\"password\"\n" +
    "                        placeholder=\"Confirm New Password\"\n" +
    "                        class=\"ipt ipt--single center\">\n" +
    "\n" +
    "                <div class=\"position-button-middle\">\n" +
    "                    <button\n" +
    "                            class=\"btn btn--gray center--inline\"\n" +
    "                            ng-disabled=\"!canSave('updateAccountForm') || isProgressing;\">Save</button>\n" +
    "                    <button\n" +
    "                            class=\"btn btn--gray center--inline\"\n" +
    "                            ng-click=\"isUpdatingAccount = false;\">Cancel</button>\n" +
    "                    <img\n" +
    "                            ng-show=\"isProgressing\"\n" +
    "                            src=\"./../assets/spinner.gif\"\n" +
    "                            style=\"vertical-align: middle;\">\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "        <form\n" +
    "                name=\"newItemForm\"\n" +
    "                ng-submit=\"sendItem();\"\n" +
    "                ng-show=\"isAddingItem === true\"\n" +
    "                class=\"form form--blue lyt--new-item-form\">\n" +
    "            <div>\n" +
    "                <p class=\"h3\">\n" +
    "                    Item details\n" +
    "                </p>\n" +
    "                <input\n" +
    "                        required\n" +
    "                        ng-model=\"item.name\"\n" +
    "                        class=\"ipt ipt--inline\"\n" +
    "                        placeholder=\"Title - Editor - Year\"\n" +
    "                        type=\"text\">\n" +
    "                <input\n" +
    "                        required\n" +
    "                        ng-model=\"item.price\"\n" +
    "                        class=\"ipt ipt--inline\"\n" +
    "                        placeholder=\"Price\"\n" +
    "                        type=\"text\">\n" +
    "                <input\n" +
    "                        required\n" +
    "                        ng-model=\"item.location\"\n" +
    "                        class=\"ipt ipt--inline\"\n" +
    "                        placeholder=\"Location\"\n" +
    "                        type=\"text\">\n" +
    "                <p class=\"h4\">\n" +
    "                    DESCRIPTION\n" +
    "                </p>\n" +
    "                <textarea\n" +
    "                        required\n" +
    "                        ng-model=\"item.description\"\n" +
    "                        rows=\"10\"\n" +
    "                        cols=\"98\"\n" +
    "                        placeholder=\"Describe the item here\">\n" +
    "                </textarea>\n" +
    "                <br>\n" +
    "                <p class=\"h4\">\n" +
    "                    COMMUNITY\n" +
    "                </p>\n" +
    "                <select\n" +
    "                        required\n" +
    "                        ng-options=\"g for g in groups\"\n" +
    "                        ng-model=\"item.group\"></select>\n" +
    "                <p class=\"h4\">\n" +
    "                    PICTURES\n" +
    "                </p>\n" +
    "                <fileupload pictures=\"pictures\"></fileupload>\n" +
    "                <br>\n" +
    "                <!--<progress id=\"progress\" value=\"0\"></progress>-->\n" +
    "                <button\n" +
    "                        class=\"btn btn--gray\"\n" +
    "                        ng-disabled=\"!canSave('newItemForm') || isProgressing;\">\n" +
    "                    Send</button>\n" +
    "                <button\n" +
    "                        class=\"btn btn--gray\"\n" +
    "                        ng-click=\"isAddingItem = false;\">Cancel</button>\n" +
    "                <img\n" +
    "                        ng-show=\"isProgressing\"\n" +
    "                        src=\"./../assets/spinner.gif\"\n" +
    "                        style=\"vertical-align: middle;\">\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    <br>\n" +
    "    <br>\n" +
    "    <h3>Your items for sale</h3>\n" +
    "\n" +
    "    <article class=\"item-box\" ng-repeat=\"item in filteredItems = (items | filter:criteria | orderBy:sortField:reverse)\" ng-controller=\"s-ItemCtrl\">\n" +
    "        <a class=\"item--thumb\" ng-href=\"/item/{{ item.ref }}\">\n" +
    "            <img ng-src=\"{{ item.pictures[0] }}\">\n" +
    "        </a>\n" +
    "        <div class=\"item--text\" ng-switch=\"isEditing\">\n" +
    "            <h3>{{ item.name }}</h3>\n" +
    "            <p class=\"price\">{{ item.price | currency:\"£ \" }}</p>\n" +
    "            <br>\n" +
    "            <a\n" +
    "                    class=\"btn btn--gray\"\n" +
    "                    href=\"\"\n" +
    "                    ng-click=\"isEditing = true\">Edit</a>\n" +
    "            <a\n" +
    "                    class=\"btn btn--gray\"\n" +
    "                    href=\"\"\n" +
    "                    ng-click=\"removeItem(item.ref)\">Remove</a>\n" +
    "            <br>\n" +
    "            <form\n" +
    "                    name=\"updateItemForm\"\n" +
    "                    class=\"form form--blue lyt--update-item-form\"\n" +
    "                    ng-switch-when=\"true\">\n" +
    "                <div>\n" +
    "                    <p class=\"h3\">\n" +
    "                        Item details\n" +
    "                    </p>\n" +
    "                    <input\n" +
    "                            required\n" +
    "                            ng-model=\"item.name\"\n" +
    "                            class=\"ipt ipt--inline\"\n" +
    "                            placeholder=\"Name of item\"\n" +
    "                            type=\"text\">\n" +
    "                    <input\n" +
    "                            required\n" +
    "                            ng-model=\"item.price\"\n" +
    "                            class=\"ipt ipt--inline\"\n" +
    "                            placeholder=\"Price\"\n" +
    "                            type=\"text\">\n" +
    "                    <input\n" +
    "                            required\n" +
    "                            ng-model=\"item.location\"\n" +
    "                            class=\"ipt ipt--inline\"\n" +
    "                            placeholder=\"Location\"\n" +
    "                            type=\"text\">\n" +
    "\n" +
    "                    <p class=\"h4\">\n" +
    "                        DESCRIPTION\n" +
    "                    </p>\n" +
    "                    <textarea\n" +
    "                            required\n" +
    "                            ng-model=\"item.description\"\n" +
    "                            rows=\"10\"\n" +
    "                            cols=\"72\"\n" +
    "                            placeholder=\"Describe the item here\">\n" +
    "                    </textarea>\n" +
    "                    <br>\n" +
    "                    <p class=\"h4\">\n" +
    "                        COMMUNITY\n" +
    "                    </p>\n" +
    "                    <select\n" +
    "                            required\n" +
    "                            ng-options=\"g for g in groups\"\n" +
    "                            ng-model=\"item.group\"></select>\n" +
    "\n" +
    "                    <!--<progress id=\"progress\" value=\"0\"></progress>-->\n" +
    "                    <br>\n" +
    "                    <br>\n" +
    "                    <button\n" +
    "                            class=\"btn btn--gray\"\n" +
    "                            ng-click=\"updateItem(item);\">Save</button>\n" +
    "                    <button\n" +
    "                            class=\"btn btn--gray\"\n" +
    "                            ng-click=\"$parent.isEditing = false;\">Cancel</button>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </article>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "</section>\n" +
    "<br>\n" +
    "");
}]);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<section class=\"home\">\n" +
    "\n" +
    "    <section class=\"searchBox\">\n" +
    "        <div class=\"types\">\n" +
    "\n" +
    "            <a\n" +
    "                    class=\"type__pill\"\n" +
    "                    ng-href=\"/\"\n" +
    "                    ng-class=\"{'is-selected': type === null}\">All</a>\n" +
    "\n" +
    "            <a\n" +
    "                    ng-repeat=\"group in groups\"\n" +
    "                    class=\"type__pill\"\n" +
    "                    ng-href=\"/?g={{ group }}\"\n" +
    "                    ng-class=\"{'is-selected': type === group}\">{{ group }}</a>\n" +
    "\n" +
    "        </div>\n" +
    "    </section>\n" +
    "\n" +
    "    <section ng-hide=\"nogroup\">\n" +
    "        <section class=\"span-single\">\n" +
    "            <h4 class=\"events\">\n" +
    "                Events\n" +
    "            </h4>\n" +
    "\n" +
    "            <ul>\n" +
    "                <li ng-repeat=\"event in events\">\n" +
    "                    <a\n" +
    "                            ng-href=\"{{ event.link }}\"\n" +
    "                            target=\"_blank\">{{ event.name }}</a>\n" +
    "                </li>\n" +
    "                <!--<hr width=\"100%\">-->\n" +
    "                <!--<li>-->\n" +
    "                <!--<a-->\n" +
    "                <!--href=\"https://www.facebook.com/events/157407171126712/?ref=23\"-->\n" +
    "                <!--target=\"_blank\">CARNIVALE - Undergraduate event</a>-->\n" +
    "                <!--</li>-->\n" +
    "                <!--<li>-->\n" +
    "                <!--<a-->\n" +
    "                <!--href=\"https://www.facebook.com/events/660443697307829/?ref=22\"-->\n" +
    "                <!--target=\"_blank\">☠ CHAOS @ fabriclondon ☠</a>-->\n" +
    "                <!--</li>-->\n" +
    "            </ul>\n" +
    "        </section>\n" +
    "\n" +
    "        <span class=\"span-single\">\n" +
    "            <br>\n" +
    "                <h4\n" +
    "                        class=\"text-center\">\n" +
    "                    Can't sell your items?\n" +
    "                    <br>\n" +
    "                    We have your back:\n" +
    "                </h4>\n" +
    "            <br>\n" +
    "                <img\n" +
    "                        class=\"center\"\n" +
    "                        style=\"cursor: pointer;\"\n" +
    "                        ng-click=\"requestFriends();\"\n" +
    "                        src=\"https://lh3.googleusercontent.com/-ESoug2foJBs/T-ntmH-Vs3I/AAAAAAAAGIM/FUQoD54w1oQ/s267/bringfriends.png\">\n" +
    "        </span>\n" +
    "\n" +
    "        <span\n" +
    "                class=\"span-single--last more-things\">\n" +
    "            <h5\n" +
    "                    style=\"top: 5px;position: relative;\"\n" +
    "                    class=\"text-center font-monkey\">\n" +
    "                More awesome things to come on Benkyet!\n" +
    "            </h5>\n" +
    "            <div class=\"center\">\n" +
    "                <a\n" +
    "                        href=\"https://twitter.com/benkyet\"\n" +
    "                        target=\"_blank\"\n" +
    "                        class=\"sprite2 sprite2--twitter\">\n" +
    "                </a>\n" +
    "                <a\n" +
    "                        href=\"https://facebook.com/benkyet\"\n" +
    "                        target=\"_blank\"\n" +
    "                        class=\"sprite2 sprite2--fb\">\n" +
    "                </a>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        </span>\n" +
    "    </section>\n" +
    "\n" +
    "    <section ng-show=\"nogroup\">\n" +
    "        <span class=\"span-single\">\n" +
    "            <img style=\"vertical-align: bottom;\" src=\"./assets/arrow_top.png\">\n" +
    "            <h5 class=\"center--inline font-indie\">Select your University</h5>\n" +
    "        </span>\n" +
    "\n" +
    "        <span class=\"span-single\">\n" +
    "\n" +
    "            <h5 class=\"center--inline font-indie\">Sell your textbooks...<br>to people around campus</h5>\n" +
    "            <img style=\"vertical-align: top;\" src=\"./assets/arrow_bottom.png\">\n" +
    "        </span>\n" +
    "\n" +
    "        <span class=\"span-single--last\">\n" +
    "            <h5 class=\"text-center font-indie\">Still feel the pain?</h5>\n" +
    "            <img\n" +
    "                    style=\"margin: 7px auto;\"\n" +
    "                    class=\"center\"\n" +
    "                    src=\"./assets/arrow_spiral.png\">\n" +
    "            <h5 class=\"text-center font-indie\">Ask for <b><a style=\"color: inherit; text-decoration: underline;\" href=\"mailto:contact@benkyet.com\">help</a></b></h5>\n" +
    "        </span>\n" +
    "\n" +
    "    </section>\n" +
    "\n" +
    "\n" +
    "    <!--<section class=\"span-double\">-->\n" +
    "        <!--<a href=\"/signup\">-->\n" +
    "            <!--<img class=\"bkt-card\" src=\"./../assets/card.jpg\">-->\n" +
    "        <!--</a>-->\n" +
    "    <!--</section>-->\n" +
    "\n" +
    "    <section class=\"sort-box\">\n" +
    "        <div class=\"sort-box__filters\">\n" +
    "            <b style=\"margin-left: 20px;\">Sort </b>\n" +
    "            <a\n" +
    "                    href=\"\"\n" +
    "                    class=\"label--single text-light\"\n" +
    "                    ng-click=\"sort('price')\"\n" +
    "                    ng-class=\"{'is-selected': isSortUp('price') || isSortDown('price')}\"\n" +
    "                    >Price</a>\n" +
    "            <i\n" +
    "                    ng-class=\"{'icon-chevron-up': isSortUp('price'), 'icon-chevron-down': isSortDown('price')}\"></i>\n" +
    "            <a\n" +
    "                    href=\"\"\n" +
    "                    class=\"label--single text-light\"\n" +
    "                    ng-click=\"sort('name')\"\n" +
    "                    ng-class=\"{'is-selected': isSortUp('name') || isSortDown('name')}\"\n" +
    "                    >Name</a>\n" +
    "            <i\n" +
    "                    ng-class=\"{'icon-chevron-up': isSortUp('name'), 'icon-chevron-down': isSortDown('name')}\"></i>\n" +
    "        </div>\n" +
    "        <label class=\"sort-box__search\">\n" +
    "            Search for: <input\n" +
    "                class=\"ipt-padding\"\n" +
    "                placeholder=\"e.g. Financial Accounting\"\n" +
    "                type=\"text\"\n" +
    "                ng-model=\"criteria\">\n" +
    "        </label>\n" +
    "    </section>\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <section class=\"max-span\">\n" +
    "        <h4>\n" +
    "            {{ filteredItems.length }} Results\n" +
    "        </h4>\n" +
    "        <article class=\"item-box\" ng-repeat=\"item in filteredItems = (items | filter:criteria | orderBy:sortField:reverse)\">\n" +
    "            <a class=\"item--thumb\" ng-href=\"/item/{{ item.ref }}\">\n" +
    "                <img ng-src=\"{{ item.pictures[0] }}\">\n" +
    "            </a>\n" +
    "            <div class=\"item--text\">\n" +
    "                <a\n" +
    "                        class=\"h3\"\n" +
    "                        ng-href=\"/item/{{ item.ref }}\">\n" +
    "                    {{ item.name }}\n" +
    "                </a>\n" +
    "                <p\n" +
    "                        class=\"price\"\n" +
    "                        ng-href=\"/item/{{ item.ref }}\">\n" +
    "                    {{ item.price | currency:\"£ \" }}</p>\n" +
    "            </div>\n" +
    "        </article>\n" +
    "    </section>\n" +
    "</section>");
}]);

angular.module("item/item.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("item/item.tpl.html",
    "<br>\n" +
    "<section class=\"container\">\n" +
    "\n" +
    "    <section class=\"main\">\n" +
    "        <h2>{{ item.name }} - {{ item.price | currency:\"£ \" }}</h2>\n" +
    "\n" +
    "        <img class=\"thumb--large\" ng-src=\"{{ item.pictures[0] }}\">\n" +
    "\n" +
    "        <h5>{{ item.location }}</h5>\n" +
    "        <p>\n" +
    "            {{ item.description }}\n" +
    "        </p>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        <br>\n" +
    "        <br>\n" +
    "    </section>\n" +
    "\n" +
    "    <section class=\"side\">\n" +
    "\n" +
    "        <aside>\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <form\n" +
    "                        novalidate\n" +
    "                        class=\"form form--blue lyt--reply-to-ad-form\"\n" +
    "                        name=\"replyForm\"\n" +
    "                        ng-submit=\"sendMessage();\"\n" +
    "                        ng-hide=\"success === true\"\n" +
    "                        ng-init=\"message = {};\">\n" +
    "\n" +
    "                    <div>\n" +
    "\n" +
    "                    <h4>\n" +
    "                        Reply to this ad:\n" +
    "                    </h4>\n" +
    "                    <input\n" +
    "                            required\n" +
    "                            type=\"text\"\n" +
    "                            class=\"ipt ipt--single\"\n" +
    "                            ng-model=\"message.name\"\n" +
    "                            placeholder=\"Your Name\">\n" +
    "                    <input\n" +
    "                            required\n" +
    "                            type=\"text\"\n" +
    "                            class=\"ipt ipt--single\"\n" +
    "                            ng-model=\"message.email\"\n" +
    "                            placeholder=\"Your Email\">\n" +
    "                    <input\n" +
    "                            required\n" +
    "                            type=\"text\"\n" +
    "                            class=\"ipt ipt--single\"\n" +
    "                            ng-model=\"message.subject\"\n" +
    "                            placeholder=\"{{ item.name }}\">\n" +
    "                    <textarea\n" +
    "                            required\n" +
    "                            cols=\"22\"\n" +
    "                            rows=\"10\"\n" +
    "                            ng-model=\"message.body\">\n" +
    "                        Hi, I found your listing on Benkyet and would like to set up a time to see see/buy this item. Please send me more information about it.\n" +
    "\n" +
    "                        Thank you.\n" +
    "                    </textarea>\n" +
    "                    <br>\n" +
    "                    <br>\n" +
    "                    <button\n" +
    "                            ng-disabled=\"!canSave();\"\n" +
    "                            class=\"btn btn--gray\">\n" +
    "                        Send Reply\n" +
    "                    </button>\n" +
    "\n" +
    "                    </div>\n" +
    "\n" +
    "                </form>\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <section\n" +
    "                        class=\"lyt--message-sent\"\n" +
    "                        ng-show=\"success === true\">\n" +
    "                    <div class=\"img-bg\">\n" +
    "                        <img src=\"./../assets/tick.png\">\n" +
    "                    </div>\n" +
    "\n" +
    "                    <h3>Message sent!</h3>\n" +
    "                    <p>\n" +
    "                        Check your inbox for replies from this seller.\n" +
    "                    </p>\n" +
    "                    <button\n" +
    "                            class=\"btn btn--blue\"\n" +
    "                            ng-click=\"backButton();\">\n" +
    "                        Back\n" +
    "                    </button>\n" +
    "                </section>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "        </aside>\n" +
    "\n" +
    "\n" +
    "    </section>\n" +
    "\n" +
    "</section>\n" +
    "<br>\n" +
    "");
}]);

angular.module("login/login.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/login.tpl.html",
    "<br>\n" +
    "<section class=\"login\">\n" +
    "    <a\n" +
    "            style=\"width: 100%;\"\n" +
    "            target=\"_top\"\n" +
    "            ng-href=\"/1.0/auth/facebook\">\n" +
    "        <img\n" +
    "                class=\"center\"\n" +
    "                src=\"./../assets/fb_login.png\">\n" +
    "    </a>\n" +
    "    <!--<h5 class=\"text-center\">Hello. Great to see you again!</h5>-->\n" +
    "    <!--<h5     class=\"text-center alert--error\"-->\n" +
    "            <!--ng-bind=\"error\"></h5>-->\n" +
    "    <!--<form>-->\n" +
    "        <!--<input-->\n" +
    "                <!--ng-model=\"user.username\"-->\n" +
    "                <!--type=\"text\"-->\n" +
    "                <!--placeholder=\"Username\"-->\n" +
    "                <!--class=\"ipt ipt--single center\">-->\n" +
    "        <!--<input-->\n" +
    "                <!--ng-model=\"user.pass\"-->\n" +
    "                <!--type=\"password\"-->\n" +
    "                <!--placeholder=\"Password\"-->\n" +
    "                <!--class=\"ipt ipt--single center\">-->\n" +
    "        <!--<button-->\n" +
    "                <!--class=\"btn btn--gray center js-login\"-->\n" +
    "                <!--ng-click=\"loginUser();\">-->\n" +
    "            <!--Log In</button>-->\n" +
    "    <!--</form>-->\n" +
    "</section>\n" +
    "<br>");
}]);

angular.module("signup/partials/step_1.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("signup/partials/step_1.tpl.html",
    "Hello agaiiiiiiiin\n" +
    "        <button ui-sref=\"signup.step2\" style=\"cursor: pointer;\">Step 2</button>\n" +
    "\n" +
    "<a\n" +
    "        style=\"width: 100%;\"\n" +
    "        target=\"_top\"\n" +
    "        ng-href=\"/1.0/auth/facebook\">\n" +
    "    <img\n" +
    "            class=\"center\"\n" +
    "            src=\"./../assets/fb_login.png\">\n" +
    "</a>");
}]);

angular.module("signup/partials/step_2.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("signup/partials/step_2.tpl.html",
    "hello again");
}]);

angular.module("signup/signup.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("signup/signup.tpl.html",
    "<br>\n" +
    "        <button ui-sref=\"signup.step1\">step 1</button>\n" +
    "<form\n" +
    "        name=\"signupForm\"\n" +
    "        class=\"signup\"\n" +
    "        ng-submit=\"sendUser();\">\n" +
    "    <h3 class=\"text-center\">GET STARTED</h3>\n" +
    "    <h5 class=\"text-center\">It's super easy and doesn't cost you a thing.</h5>\n" +
    "    <h5\n" +
    "            class=\"alert--error text-center\"\n" +
    "            ng-bind=\"error\"></h5>\n" +
    "    <input\n" +
    "            required\n" +
    "            ng-model=\"user.username\"\n" +
    "            type=\"text\"\n" +
    "            placeholder=\"Username\"\n" +
    "            class=\"ipt ipt--single center\">\n" +
    "    <input\n" +
    "            required\n" +
    "            ng-model=\"user.email\"\n" +
    "            type=\"text\"\n" +
    "            placeholder=\"Email\"\n" +
    "            class=\"ipt ipt--single center\">\n" +
    "    <input\n" +
    "            required\n" +
    "            ng-model=\"user.pass\"\n" +
    "            type=\"password\"\n" +
    "            placeholder=\"Password\"\n" +
    "            class=\"ipt ipt--single center\">\n" +
    "    <input\n" +
    "            required\n" +
    "            ng-model=\"user.confirm\"\n" +
    "            type=\"password\"\n" +
    "            placeholder=\"Confirm\"\n" +
    "            class=\"ipt ipt--single center\">\n" +
    "    <button\n" +
    "            class=\"btn btn--gray center js-signup\"\n" +
    "            ng-disabled=\"!canSave('signupForm');\">\n" +
    "        Sign Up</button>\n" +
    "</form>\n" +
    "<br>");
}]);
