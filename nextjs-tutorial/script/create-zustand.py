import os

# 파일 템플릿
def create_template(store_name):
    capitalized_store_name = store_name[0].upper() + store_name[1:]  # 첫 글자 대문자로 변환
    return f"""import {{create}} from 'zustand';
import {{createStateHandlers, T_DefaultStoreType}} from './func';

type T_{capitalized_store_name}Store = {{
  /** 모달 관리 state */
}};

/**
 * Default 값
 * initialState에 state 추가 시 자동으로 get, set, use 함수 생성
 */
const initialState: T_{capitalized_store_name}Store = {{
}};

const createStore = () => {{
  return create<T_{capitalized_store_name}Store & T_DefaultStoreType>((set) => ({{
    ...initialState,
    set: (key: string, value: any) => set((state) => ({{...state, [key]: value}})),
    reset: () => set(() => initialState),
  }}));
}};

const use{capitalized_store_name}Store = createStore();

export const {store_name}Store = {{
  ...createStateHandlers<T_{capitalized_store_name}Store>(use{capitalized_store_name}Store, initialState),
  reset: () => use{capitalized_store_name}Store.getState().reset(),
}};
"""

# 터미널 입력 요청
store_name = input("Store 이름을 입력하세요 (소문자로 시작): ").strip()

if not store_name:
    print("❌ Store 이름이 입력되지 않았습니다. 다시 시도하세요.")
    exit(1)

# 파일 경로 설정
base_dir = os.path.join(os.getcwd(), "src", "store", "zustand")
os.makedirs(base_dir, exist_ok=True)  # 디렉토리 없으면 생성

file_name = f"use{store_name[0].upper() + store_name[1:]}Store.ts"
file_path = os.path.join(base_dir, file_name)

# 파일 생성
try:
    with open(file_path, "w", encoding="utf-8") as file:
        file.write(create_template(store_name))
    print(f"✅ {file_name} 파일이 src/store/zustand에 생성되었습니다!")
except Exception as e:
    print(f"❌ 파일 생성 중 오류가 발생했습니다: {e}")
