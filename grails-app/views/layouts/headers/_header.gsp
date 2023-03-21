<%@ page import="grails.util.Environment" %>
<div class="hidden-xs hidden-sm topLinks cf">
    <g:link controller="cart" action="index" class="cart">Cart</g:link>
    <a href="/SellBack.SellCart.do">Sellback List</a>

    %{--<a href="${grailsApplication.config.valore.legacyUrl}/SignOut.do">Sign Out</a>--}%

    <a href="/YourAccount.do">Order Lookup</a>

    <a href="http://help.valorebooks.com">Support</a>
</div>

<header class="header-main cf">
    <div class="top cf">
        <div class="width-pagemax">
            <a href="/" class="logo-main" aria-label="logo" >
                <!-- SVG Logo -->
                <g:render template="/layouts/headers/includes/SVGLogo"/>
            </a>
            <ul class="header-iconmenu cf hidden-md hidden-lg">

                <li><g:link controller="cart" action="index" class="icon-basket"><span class="screenReaderText">Your Cart</span></g:link></li>

                <li><a href="#" class="icon-search" id="SearchToggle"><span class="screenReaderText">Search</span></a></li>

                <li><a href="#" class="icon-menu" id="NavToggle"><span class="screenReaderText">Menu</span></a></li>
            </ul>

            <form action="/Search.DefineSearch.do" method="post" class="header-searchinput cf" id="HeaderSearchForm">
                <input type="text" id="search_input" name="text" value="" placeholder="Search millions of products!" />
                <button type="submit" class="icon-search hidden-xs hidden-sm" aria-label="search"></button>
                <a href="#" id="HeaderSearchClear" class="cancel">Cancel</a>
                <input type="hidden" value="header" name="search_type">
                <input name="header_search_option" value="keyword" type="hidden">
                <input name="department" id="header_search_dept" value="All Departments" type="hidden">
                <div id="ac-suggests" class="autocomplete-suggestions"></div>
            </form>
        </div>
    </div>

    <nav class="header-nav" id="header-nav">
        <div class="width-pagemax">

            <div class="nav-mobile hidden-md hidden-lg">
                <a href="/SellBack.SellCart.do" class="pull-left">Sellback list</a>
                <a href="/YourAccount.do">Rental return</a>
                <a href="/YourAccount.do" class="pull-right" rel="nofollow">Order status</a>
            </div>

            <ul class="header-nav-linklist cf" id="header-nav-linklist">
                <li><a href="/rent-textbooks">Rent Textbooks</a></li>
                <li><a href="/buy-textbooks">Buy Textbooks</a></li>
                <li><a href="/sell-textbooks">Sell Textbooks</a></li>

                <li><a href="https://marketplace.valorebooks.com/">Merchant Solutions</a></li>
                <li class="pull-right hidden-xs hidden-sm"><a href="/YourAccount.do">Return rental<span class="icon-right-open"></span></a></li>
            </ul>
        </div>
    </nav>

</header>