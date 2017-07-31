import { Controllers } from "./controller"

export abstract class ResourceController extends Controllers.Controller {

  /**
   * Returns a list of all objects. A page number and limit can also
   * be specified to reduce the number of results returned.
   *
   * @param {number} pageNumber The requested page number of results
   * @param {number} limit      A limit of items per page
   */
  public abstract all(pageNumber?: number, limit?: number): void;

  /**
   * Finds an item with the given ID.
   *
   * @param {string|number} id A String or Number that defines the item
   */
  public abstract find(id: string | number): void;

  /**
   * Creates a new item with information in the given object. When
   * returning information to the user the new object should be
   * returned along with the ID of the new item.
   *
   * @param {any} item An object with details to be created
   */
  public abstract create(item: any): void;

  /**
   * Updates an item with the given ID with information in the given
   * object. It should be noted that any key not in the given object
   * should be nullified. When returning information to the user the
   * full object should be returned along with the ID of the new item.
   *
   * @param {string|number} id   A String or number that defines the item
   * @param {any}           item An object with details to be modified
   */
  public abstract replace(id: string | number, item: any): void;

  /**
   * Modifys an item with the given ID with information in the given
   * object. It should be noted that any key not in the given object
   * should remain as they are with no changes. When returning
   * information to the user the full object should be returned along
   * with the ID of the new item.
   *
   * @param {string|number} id   A String or number that defines the item
   * @param {any}           item An object with details to be modified
   */
  public abstract modify(id: string | number, item: any): void;

  /**
   * Deletes an item with the given ID.
   *
   * @param {string|number} id A String or Number that defines the item
   */
  public abstract delete(id: string | number): void;

}
