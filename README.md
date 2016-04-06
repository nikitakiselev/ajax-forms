# ajax-forms
Ajax Form Class

## Install via bower

```
bower install digitalhammer/ajax-forms
```

**Add script to page**

```
<script src="bower_components/ajax-forms/AjaxForm.js"></script>
```

## How to use

** create form html **
```
<form action="form-handler.php" id="ajax-form">
  <div class="form-group">
    <input type="text" name="email" value="" class="form-control"/>
  </div>
  
  <button type="submit">Send</button>
</form>
```

** script.js **
```
var ajaxForm = new AjaxForm('#ajax-form', options);
```

## Options

**autoHelpBlock** - (default: false) create help block, if not exists
**controlClass** - (default: '.form-control') form control class
@TODO
