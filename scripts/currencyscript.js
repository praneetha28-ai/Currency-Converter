var from;
var to=[];

// function to generate from options
populateFromOptions();

// function to generate to options
populateToOptions();

// search currencies in dropdown 
function searchFrom()
{
    var inputWord = document.getElementById("searchforFrom").value;
    var searchWord = inputWord.toUpperCase();
    var fromListCountries = document.getElementById("fromList");
    var listElements = fromListCountries.getElementsByTagName('li');
    for (i = 1; i < listElements.length; i++) {
        a = listElements[i].getElementsByTagName("a")[0];
        txtValue = a.innerText;
        if (txtValue.toUpperCase().startsWith(searchWord)) {
            listElements[i].style.display = "";
        } else {
            listElements[i].style.display = "none";
        }
      }
}

// search currencies in dropddown 
function searchTo()
{
    var inputWord = document.getElementById("searchforTo").value;
    var searchWord = inputWord.toUpperCase();
    var fromListCountries = document.getElementById("toList");
    var listElements = fromListCountries.getElementsByTagName('li');
    for (i = 1; i < listElements.length; i++) {
        a = listElements[i].getElementsByTagName("a")[0];
        txtValue = a.innerText;
        if (txtValue.toUpperCase().startsWith(searchWord) ) {
            listElements[i].style.display = "";
        } else {
            listElements[i].style.display = "none";
        }
      }
}


function populateFromOptions()
{
    fetch('datafiles/output.json').
    then((response)=>response.json()).
    then((jsonData)=>
    {
        const ulElement1 = document.getElementById('fromList');
        jsonData.forEach(country => 
            {
                const optionElement = document.createElement('option');
                optionElement.value = country['currency_code'];
                optionElement.textContent = country['country'] + ' - ' + country['currency_code'];
                ulElement1.appendChild(optionElement);
            });
            ulElement1.addEventListener('change', event => {
                const selectedOption = event.target.options[event.target.selectedIndex];
                console.log(selectedOption);
                // document.getElementById('inputValue1').value = selectedOption.textContent;
                from = selectedOption.value;
                console.log(from);
                calculate();
            });
    });
    
}

function populateToOptions() 
{
    fetch('datafiles/output.json').
    then((response)=>response.json()).
    then((jsonData)=>
    {
        const ulElement1 = document.getElementById('toList');
        jsonData.forEach(country => 
            {
                const optionElement = document.createElement('option');
                optionElement.value = country['currency_code'];
                optionElement.textContent = country['country'] + ' - ' + country['currency_code'];
                ulElement1.appendChild(optionElement);
            });
            ulElement1.addEventListener('change', event => {
                const selectedOption = event.target.selectedOptions;
                
                console.log(selectedOption);
                // document.getElementById('inputValue2').value = selectedOption.textContent;
                var toList = []
                for(var i =0 ;i<selectedOption.length;i++)
                    {
                        toList.push(selectedOption[i].value);
                    }
                to = toList;
                console.log(to);
                calculate();
            });
    });
    
}


function calculate()
{
    document.getElementById("result").innerHTML="";
    fetch('datafiles/exchangeRates.json').
    then((response)=>response.json()).
    then
    (
        (json)=>
        {
            console.log(from);
            var amount = document.getElementById("inputAmount").value;
            if(from && to && amount)
            {
                var inputToDollar = amount/json['rates'][from];
                var result="" ;
                for(var i = 0 ;i<to.length;i++)
                {
                    var dollarToOputput = inputToDollar* json['rates'][to[i]];
                    var rounded  =  dollarToOputput.toFixed(2);
                    result += amount+' '+from+ ' = '+ rounded+' '+ to[i];
                    result+="<br><hr>";
                }
                document.getElementById("result").innerHTML = rounded == "NaN"?"" : result;
            }
        }
    )
}