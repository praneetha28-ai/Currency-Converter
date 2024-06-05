function updateCurrencyData(data) 
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            console.log(xhttp.responseText);
        }
    };
    xhttp.open('POST', 'currency.php', true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send('newdata=' + JSON.stringify(data));
}

function checkLatestDate() 
{
    $.get('https://openexchangerates.org/api/latest.json', 
    {app_id: 'bbb1fb49c98c40879eed6ee54d5e43f1'}, 
    function(data) 
    {
        var today = new Date();
        if (data['timestamp'] >= today.getTime()) 
        {
            Swal.fire("Updating data");
            console.log("Updating data...");
            updateCurrencyData(data);
        }
    });
}
checkLatestDate();