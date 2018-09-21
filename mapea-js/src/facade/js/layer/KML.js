/**
 * @module M/layer/KML
 */
import KMLImpl from 'impl/layer/KML';
import LayerVector from './Vector';
import { isNullOrEmpty, isUndefined, normalize, isString } from '../util/Utils';
import Exception from '../exception/exception';
import * as LayerType from './Type';
import * as parameter from '../parameter/parameter';

/**
 * @classdesc
 * Main constructor of the class. Creates a WMS layer
 * with parameters specified by the user
 * @api
 */
class KML extends LayerVector {
  /**
   *
   * @constructor
   * @extends {M.layer.Vector}
   * @param {string|Mx.parameters.KML} userParameters parameters
   * @param {Mx.parameters.LayerOptions} options provided by the user
   * @api
   */
  constructor(userParameters, options = {}) {
    /**
     * Implementation of this layer
     * @public
     * @type {M.layer.KML}
     */
    const impl = new KMLImpl(options);

    // This layer is of parameters.
    const parameters = parameter.layer(userParameters, LayerType.KML);

    // calls the super constructor
    super(parameters, options, impl);

    // checks if the implementation can create KML layers
    if (isUndefined(KMLImpl)) {
      Exception('La implementación usada no puede crear capas KML');
    }

    // checks if the param is null or empty
    if (isNullOrEmpty(userParameters)) {
      Exception('No ha especificado ningún parámetro');
    }

    // extract
    this.extract = parameters.extract;

    // options
    this.options = options;
  }

  /**
   * 'type' This property indicates if
   * the layer was selected
   */
  get type() {
    return LayerType.KML;
  }

  set type(newType) {
    if (!isUndefined(newType) &&
      !isNullOrEmpty(newType) && (newType !== LayerType.KML)) {
      Exception('El tipo de capa debe ser \''.concat(LayerType.KML).concat('\' pero se ha especificado \'').concat(newType).concat('\''));
    }
  }

  /**
   * 'transparent' the layer name
   */

  get extract() {
    return this.getImpl().extract;
  }

  set extract(newExtract) {
    if (!isNullOrEmpty(newExtract)) {
      if (isString(newExtract)) {
        this.getImpl().extract = (normalize(newExtract) === 'true');
      } else {
        this.getImpl().extract = newExtract;
      }
    } else {
      this.getImpl().extract = true;
    }
  }

  /**
   * 'options' the layer options
   */
  get options() {
    return this.getImpl().options;
  }

  set options(newOptions) {
    this.getImpl().options = newOptions;
  }

  /**
   * This function checks if an object is equals
   * to this layer
   *
   * @function
   * @api
   */
  equals(obj) {
    let equals = false;

    if (obj instanceof KML) {
      equals = (this.url === obj.url);
      equals = equals && (this.name === obj.name);
      equals = equals && (this.extract === obj.extract);
    }

    return equals;
  }
}

export default KML;
