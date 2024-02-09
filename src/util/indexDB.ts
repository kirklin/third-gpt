"use client";

import { logger } from "@kirklin/logger";
import { isServer } from "detect-mobile";

// 检查浏览器是否支持 IndexedDB
export function isIndexedDBSupported() {
  if (isServer || !window.indexedDB) {
    console.error("Your browser doesn't support a stable version of IndexedDB. Some features may not be available.");
    return false;
  }
  return true;
}

// 数据库名称和表名
const dbName = "third-gpt";
export const collectionTableName = "third-gpt-collection";

// 数据库操作接口
interface IDBOperations {
  write: (tableName: string, data: any) => Promise<boolean>;
  remove: (tableName: string, key: any) => Promise<boolean>;
  read: (tableName: string, key: string) => Promise<unknown | null>;
  readAll: (tableName: string) => Promise<unknown | null>;
}

// 初始化数据库操作
function initDBOperations(db: IDBDatabase): IDBOperations {
  const write = (tableName: string, data: any): Promise<boolean> => {
    const store = db.transaction([tableName], "readwrite").objectStore(tableName);
    const request = store.add(data);

    return new Promise((resolve) => {
      request.onsuccess = () => {
        resolve(true);
      };
      request.onerror = () => {
        resolve(false);
      };
    });
  };

  const remove = (tableName: string, key: any): Promise<boolean> => {
    const store = db.transaction([tableName], "readwrite").objectStore(tableName);
    const request = store.delete(key);

    return new Promise((resolve) => {
      request.onsuccess = () => {
        resolve(true);
      };
      request.onerror = () => {
        resolve(false);
      };
    });
  };

  const read = (tableName: string, key: string): Promise<unknown | null> => {
    const store = db.transaction([tableName]).objectStore(tableName);
    const request = store.get(key);

    return new Promise((resolve) => {
      request.onsuccess = () => {
        resolve(request.result ? request.result : null);
      };
      request.onerror = () => {
        resolve(null);
      };
    });
  };

  const readAll = (tableName: string): Promise<unknown | null> => {
    const store = db.transaction([tableName]).objectStore(tableName);
    const request = store.getAll();

    return new Promise((resolve) => {
      request.onsuccess = () => {
        resolve(request.result ? request.result : null);
      };
      request.onerror = () => {
        resolve(null);
      };
    });
  };

  return {
    write,
    remove,
    read,
    readAll,
  };
}

// 获取数据库实例
export function getDatabase(version = 1): Promise<IDBOperations> {
  return new Promise<IDBOperations>((resolve, reject) => {
    let indexedDB = null;

    if (typeof window !== "undefined") {
      indexedDB = window.indexedDB;
    }

    if (!indexedDB) {
      return;
    }
    const request = indexedDB.open(dbName, version);

    request.onerror = () => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject("Database Error: open failed!");
    };

    request.onsuccess = (event) => {
      const db = (event.target as any).result;
      resolve(initDBOperations(db));
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as any).result;

      // 创建数据库表
      db.createObjectStore(collectionTableName, { keyPath: "name" });

      // 数据库创建完成后初始化数据库操作
      db.transaction.oncomplete = () => {
        logger.info("Database created successfully.");
        resolve(initDBOperations(db));
      };
    };
  });
}

// 获取数据库操作对象的实例
const _databaseOperations: Promise<IDBOperations> = getDatabase();
