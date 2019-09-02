/* Measurement types

Shirt:
    Shirt Length
    Sleeve Length
    Chest Width

Pants:
    Pant Length
    Waist Length
*/

export class ShirtMeasurementType {
  shirtLength;
  sleeveLength;
  chestWidth;
  constructor(shirtLength, sleeveLength, chestWidth) {
    this.shirtLength = shirtLength;
    this.sleeveLength = sleeveLength;
    this.chestWidth = chestWidth;
  }
  static fromJSON(json: string) {
    var object: any = {};
    object = JSON.parse(json);
    console.log("Created shirt obj ", object);
    return new this(
      object.measurements[0].value,
      object.measurements[1].value,
      object.measurements[2].value
    );
  }
  encodeToString() {
    var object: any = {};
    object.type = "Shirt";
    object.measurements = [];
    object.measurements.push({ name: "Shirt Length", value: this.shirtLength });
    object.measurements.push({
      name: "Sleeve Length",
      value: this.sleeveLength
    });
    object.measurements.push({ name: "Chest Width", value: this.chestWidth });
    return JSON.stringify(object);
  }
}

export class PantsMeasurementType {
  pantsLength;
  waistLength;
  constructor(pantsLength, waistLength) {
    this.pantsLength = pantsLength;
    this.waistLength = waistLength;
  }
  static fromJSON(json: string) {
    var object: any = {};
    object = JSON.parse(json);
    console.log("Created pants obj ", object);
    return new this(object.measurements[0].value, object.measurements[1].value);
  }
  encodeToString() {
    var object: any = {};
    object.type = "Pants";
    object.measurements = [];
    object.measurements.push({ name: "Pants Length", value: this.pantsLength });
    object.measurements.push({ name: "Waist Length", value: this.waistLength });
    return JSON.stringify(object);
  }
}
