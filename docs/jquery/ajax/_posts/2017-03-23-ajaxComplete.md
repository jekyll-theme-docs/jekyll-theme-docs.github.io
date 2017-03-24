---
title: .ajaxComplete()
description: Register a handler to be called when Ajax requests complete. This is an AjaxEvent.
---

**Description:** Register a handler to be called when Ajax requests complete. This is an [AjaxEvent](#).

{: .panel .panel-default }
> **.ajaxComplete( handler )**
> 
> **handler**
> Type: Function( Event event, jqXHR jqXHR, PlainObject ajaxOptions )
> 
> The function to be invoked.


Whenever an Ajax request completes, jQuery triggers the `ajaxComplete` event. Any and all handlers that have been registered with the `.ajaxComplete()` method are executed at this time.

To observe this method in action, set up a basic Ajax load request:

```html
<div class="trigger">Trigger</div>
<div class="result"></div>
<div class="log"></div>
```

Now, make an Ajax request using any jQuery method:

```js
$( ".trigger" ).click(function() {
  $( ".result" ).load( "ajax/test.html" );
});
```

When the user clicks the element with class `trigger` and the Ajax request completes, the log message is displayed.

All `ajaxComplete` handlers are invoked, regardless of what Ajax request was completed. If you must differentiate between the requests, use the parameters passed to the handler. Each time an `ajaxComplete` handler is executed, it is passed the event object, the `XMLHttpRequest` object, and the settings object that was used in the creation of the request. For example, you can restrict the callback to only handling events dealing with a particular URL:

```js
$( document ).ajaxComplete(function( event, xhr, settings ) {
  if ( settings.url === "ajax/test.html" ) {
    $( ".log" ).text( "Triggered ajaxComplete handler. The result is " +
      xhr.responseText );
  }
});
```

**Note:** You can get the returned Ajax contents by looking at `xhr.responseText`.

### Additional Notes:

- As of jQuery 1.9, all the handlers for the [jQuery global Ajax events](#), including those added with the `.ajaxComplete()` method, *must* be attached to `document`.
- If `$.ajax()` or `$.ajaxSetup()` is called with the `global` option set to `false`, the `.ajaxComplete()` method will not fire.

## Example:

Show a message when an Ajax request completes.

```js
$( document ).ajaxComplete(function( event,request, settings ) {
  $( "#msg" ).append( "<li>Request Complete.</li>" );
});
```
