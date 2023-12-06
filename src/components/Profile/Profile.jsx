import GitSvg from "@/assets/Icons/GitSvg.jsx";

export function Profile() {
  return (
    <>
      <div className="container">
        <div className="flex flex-row h-full items-stretch justify-between">
          <div className="justify-between ml-10">
            <h1 className="text-5xl font-bold mt-5">
              안녕하세요! 이웅회입니다.
            </h1>
            <p className="py-6">이잉 기모링 자기소개</p>
          </div>
          <div className="flex flex-col justify-center mr-10">
            <img
              src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
              className="w-48 rounded-full aspect-square object-cover m-2"
            />
            <div className="join justify-center">
              <button className="btn join-item">
                <GitSvg />
              </button>
              <button className="btn join-item">
                <GitSvg />
              </button>
              <button className="btn join-item">
                <GitSvg />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
