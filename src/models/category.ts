import storage, { load } from "@/config/storage";
import axios from "axios";
import { Effect, Model, SubscriptionsMapObject } from "dva-core-ts";
import { Reducer } from "redux";
import { RootState } from ".";

export interface ICategory {
    id: string,
    name: string,
    classify?: string
}
interface CategoryModelState {
    isEdit: boolean,
    myCategorys: ICategory[],
    categorys: ICategory[]
}

interface CategoryModel extends Model {
    namespace: "category",
    state: CategoryModelState,
    effects: {
        loadData: Effect,
        toggle: Effect
    },
    reducers: {
        setState: Reducer<CategoryModelState>
    },
    subscriptions: SubscriptionsMapObject
}
const initialState = {
    isEdit: false,
    myCategorys: [
        {
            id: "home",
            name: "推荐"
        },
        {
            id: "vip",
            name: "vip"
        }
    ],
    categorys: [{
        id: "vip",
        name: "vip"
    }]
}
const CATEGORY_URL = "/mock/13/category"
const categoryModel: CategoryModel = {
    namespace: "category",
    state: initialState,
    effects: {
        *loadData(_, { call, put }) {
            const categorys: ICategory[] = yield call(load, {
                key: 'categorys',
            });

            const myCategorys: ICategory[] = yield call(load, {
                key: 'myCategorys',
            });
            let payload;
            if (myCategorys) {
                payload = {
                    myCategorys,
                    categorys,
                    isEdit: false,
                };
            } else {
                payload = {
                    categorys,
                    isEdit: false,
                };
            }
            yield put({
                type: 'setState',
                payload,
            });
        },
        *toggle({payload}, {put, select}) {
            const category: CategoryModelState = yield select(
              (state: RootState) => state.category,
            );
            yield put({
              type: 'setState',
              payload: {
                isEdit: !category.isEdit,
                myCategorys: payload.myCategorys,
              },
            });
            if (category.isEdit) {
              storage.save({
                key: 'myCategorys',
                data: payload.myCategorys,
              });
            }
          },
    },
    reducers: {
        setState(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        }
    },
    subscriptions: {
        setup({ dispatch }) {
            dispatch({ type: "loadData" })
        },
        asyncStorage() {
            // console.log("jll"
            // load categoryList时执行的异步请求
            storage.sync.categorys = async () => {
                const { data } = await axios.get(CATEGORY_URL);
                return data;
            };
            // load myCategoryList时执行的异步请求,其实这里直接写一个固定的数组就可以了，因为选择的类别默认都会有两个推荐和vip
            storage.sync.myCategorys = async () => {
                return null;
            };
        },
    }
}

export default categoryModel