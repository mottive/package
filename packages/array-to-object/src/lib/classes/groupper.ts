import { GroupMap, Level, Map } from "../types/types";

export class Groupper{

  protected levels: Record<number, Record<string, boolean>> = {};
  protected dictionary: any = {};

  constructor(protected data: Array<any>, protected map: Map) {
    this.fetchRows(this.map);
  }

  make() {
    return this.dictionary;
  }

  fetchTypesOfLevel(map: Map): Level {
    const retorno: Level = {
      group: [],
      nest: [],
      array: [],
    };

    if (typeof map === "string") {

      retorno.array.push(map)

    } else {

      Object.keys(map).forEach((key) => {

        const value = map[key]
        
        if (typeof value === "string") {
          retorno.group.push(value);
        } else {
          retorno.nest.push(...Object.keys(value));
        }

      })
    }

    return retorno;
  }

  fetchRows(map:any) {
    for (let i = 0; i < this.data.length; i++) {
      const row = this.data[i];
      this.fetchRow(row, map, this.dictionary);
    }
  }

  fetchRow(row: Array<string>, map: Map, base_buffer: any) {
    const levels = this.fetchTypesOfLevel(map);

    // crio os filhos
    const nested = this.getNestedLevelsFromMap(map);
    if (Array.isArray(nested)) {
      const buffer = this.createDictionaryEntry(base_buffer, row, levels.group);
      nested.forEach((nests) => {
        Object.keys(nests).forEach((nestName) => {
          this.fetchNestedRow(row, nests[nestName], buffer, nestName);
        });
      });
    } else {
      //
      // como não é uma array de map
      // deve tratar como lista
      base_buffer.add(row[map as string]);
    }
  }

  fetchNestedRow(row: Array<string>, map: Map, base_buffer: any, nest: string) {
    // crio o agrupamento
    const buffer = base_buffer;

    if (Array.isArray(map)) {
      if (buffer[nest] === undefined) {
        buffer[nest] = {};
      }

      this.fetchRow(row, map, buffer[nest]);
    } else {
      //
      // ao entrar aqui nao é objeto
      // mas sim uma lista

      if (buffer[nest] === undefined) {
        buffer[nest] = new Set();
      }

      this.fetchRow(row, map, buffer[nest]);
    }
  }

  //
  //

  createDictionaryEntry(buffering: any, row: Array<any>, groupMap:GroupMap) {

    let buffer = buffering;
    const data = {};

    groupMap.forEach((label) => {

      const value = row[label];

      if (buffer[value] === undefined) {
        buffer[value] = {};
      }

      buffer = buffer[value]
      data[label] = value

    })

    // atribuo os dados ao objeto
    Object.assign(buffer, data)

    return buffer

  }

  getNestedLevelsFromMap(map: Map) {
    return Array.isArray(map) ? map.filter((x) => typeof x === "object") : map
  }

}
