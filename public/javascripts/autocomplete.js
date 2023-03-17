let autocomplete;
function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("attraction"),
    {
      types: ["establishment"],
      componentRestrictions: { country: ["US"] },
      fields: ["name", "formatted_address", "price_level"],
    }
  );

  autocomplete.addListener("place_changed", onPlaceChanged);
}

function onPlaceChanged() {
  var place = autocomplete.getPlace();
  if (!place.name) {
    document.getElementById("attraction").placeholder = "Enter a place";
  } else {
    document.getElementById("attraction").value = place.name;
    document
      .getElementById("location")
      .setAttribute("value", place.formatted_address);
    document
      .querySelector(".price-level-symbol")
      .setAttribute("data-price-level", place.price_level);
  }
}
