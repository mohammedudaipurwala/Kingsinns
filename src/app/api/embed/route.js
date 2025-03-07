// app/api/widget/route.js
import { NextResponse } from "next/server";

export function GET() {
  const widgetJs = `
    (function() {
      let domain = window.location.host;
      let script = document.currentScript;

      let bot = script.getAttribute("bot-id");
      let primaryColor = script.getAttribute("primary-color");
      let appURL = '${process.env.NEXT_PUBLIC_WIDGET_URL}';

      function initializeChatWidget() {
        const websiteWidth = window.top.innerWidth;

        let mainContainer = document.createElement('div');
        mainContainer.id = 'main-container';

        const chatIcon = '<svg class="chatIconsxp" width="25" height="25" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 0C24.0607 0 31 6.93935 31 15.5C31 24.0606 24.0607 31 15.5 31C13.0262 31.0034 10.5878 30.4123 8.39016 29.2764L2.45986 30.9302C2.129 31.0226 1.77954 31.0253 1.44728 30.9381C1.11503 30.8509 0.811927 30.677 0.569033 30.4341C0.326139 30.1912 0.152187 29.8881 0.065 29.5558C-0.0221865 29.2236 -0.0194728 28.8741 0.0728629 28.5432L1.72826 22.6176C0.589558 20.418 -0.00320664 17.9768 1.30463e-05 15.5C1.30463e-05 6.93935 6.93936 0 15.5 0ZM15.5 2.325C12.0058 2.325 8.65467 3.71308 6.18388 6.18387C3.71309 8.65466 2.32501 12.0058 2.32501 15.5C2.32501 17.7785 2.90316 19.9686 3.98816 21.9123L4.22066 22.3308L2.49706 28.506L8.67691 26.7824L9.09541 27.0149C10.8537 27.9925 12.8125 28.5544 14.8216 28.6576C16.8308 28.7608 18.8369 28.4026 20.6861 27.6103C22.5353 26.818 24.1785 25.6128 25.4897 24.087C26.8009 22.5612 27.7453 20.7554 28.2504 18.8081C28.7555 16.8608 28.808 14.8236 28.4038 12.8529C27.9996 10.8821 27.1495 9.03012 25.9185 7.43886C24.6876 5.8476 23.1087 4.55935 21.3027 3.67292C19.4968 2.78648 17.5118 2.32538 15.5 2.325ZM10.4625 17.05H17.4344C17.7289 17.0501 18.0125 17.162 18.2277 17.3631C18.4429 17.5641 18.5738 17.8394 18.5938 18.1333C18.6139 18.4271 18.5217 18.7176 18.3358 18.9461C18.15 19.1746 17.8843 19.324 17.5925 19.3641L17.4344 19.375H10.4625C10.168 19.3749 9.88445 19.263 9.66923 19.0619C9.45402 18.8609 9.32315 18.5856 9.30307 18.2917C9.28299 17.9979 9.37521 17.7074 9.56108 17.4789C9.74695 17.2504 10.0126 17.101 10.3044 17.0608L10.4625 17.05ZM10.4625 11.625H20.5453C20.8397 11.6255 21.1229 11.7376 21.3378 11.9388C21.5528 12.14 21.6833 12.4153 21.7032 12.709C21.7231 13.0028 21.6308 13.2931 21.4449 13.5214C21.259 13.7497 20.9935 13.899 20.7018 13.9391L20.5453 13.95H10.4625C10.168 13.9499 9.88445 13.838 9.66923 13.6369C9.45402 13.4359 9.32315 13.1606 9.30307 12.8667C9.28299 12.5729 9.37521 12.2824 9.56108 12.0539C9.74695 11.8254 10.0126 11.676 10.3044 11.6358L10.4625 11.625Z" fill="white"/></svg>';

        const closeIcon = '<svg width="15" height="15" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M30.638 1C31.0222 0.60324 31.6553 0.593049 32.0521 0.977237C32.4488 1.36142 32.459 1.99451 32.0748 2.39127L18.3924 16.5214L33.0008 31.6079C33.385 32.0046 33.3748 32.6377 32.978 33.0219C32.5813 33.4061 31.9482 33.3959 31.564 32.9991L17.0004 17.959L2.43679 32.9991C2.0526 33.3959 1.41952 33.4061 1.02276 33.0219C0.626003 32.6377 0.615812 32.0046 1 31.6079L15.6084 16.5214L1.92598 2.39127C1.54179 1.99451 1.55199 1.36142 1.94875 0.977237C2.3455 0.593049 2.97859 0.60324 3.36278 1L17.0004 15.0839L30.638 1Z" fill="white"/></svg>';

        const createLoaderSVG = (color) => {
          return \`
            <svg width="30" height="30" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="spinner-secondHalf">
                  <stop offset="0%" stop-opacity="0" stop-color="#\${color}" />
                  <stop offset="100%" stop-opacity="0.5" stop-color="#\${color}" />
                </linearGradient>
                <linearGradient id="spinner-firstHalf">
                  <stop offset="0%" stop-opacity="1" stop-color="#\${color}" />
                  <stop offset="100%" stop-opacity="0.5" stop-color="#\${color}" />
                </linearGradient>
              </defs>
              <g stroke-width="12">
                <path stroke="url(#spinner-secondHalf)" d="M 4 100 A 96 96 0 0 1 196 100" />
                <path stroke="url(#spinner-firstHalf)" d="M 196 100 A 96 96 0 0 1 4 100" />
                <path stroke="#\${color}" stroke-linecap="round" d="M 4 100 A 96 96 0 0 1 4 98" />
              </g>
              <animateTransform
                from="0 0 0"
                to="360 0 0"
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="1300ms"
              />
            </svg>
          \`;
        };

        const loaderIcon = createLoaderSVG(primaryColor);
        
        const chatButton = document.createElement('button');
        chatButton.id = 'bot-chat';
        chatButton.innerHTML = chatIcon;

        const iframeContainer = document.createElement('div');
        iframeContainer.classList.add("container");

        const iframe = document.createElement('iframe');
        iframe.id = 'iframe-container';

        const loader = document.createElement('div');
        loader.id = 'loader';
        loader.innerHTML = loaderIcon;

        if (websiteWidth <= 767) {
          iframe.classList.add('narrow');
        } else {
          iframe.classList.add('wide');
        }

        const widgetUrl = \`\${appURL}/widget\`;
        iframe.src = widgetUrl;

        iframeContainer.appendChild(iframe);
        iframeContainer.appendChild(loader);
        mainContainer.appendChild(chatButton);
        mainContainer.appendChild(iframeContainer);
        document.body.appendChild(mainContainer);

        const mainStyle = document.createElement('style');
        mainStyle.textContent = \`
          #main-container {
            position: fixed;
            bottom: 0;
            right: 0;
            z-index: 9999;
            width: 100vw;
          }

          .container {
            width: 100%;
          }

          #iframe-container {
            height: 80vh;
            position: absolute;
            bottom: 90px;
            right: 20px;
            background: white;
            border-radius: 10px;
            border: 0;
            display: block;
            box-sizing: border-box;
            box-shadow: 0 5px 20px rgba(0,0,0,.1);
            transition: all 0.3s ease-out;
            opacity: 0;
            visibility: hidden;
          }

          #iframe-container.show {
            opacity: 1;
            visibility: visible;
          }

          #bot-chat {
            position: absolute;
            bottom: 20px;
            right: 20px;
            padding: 10px;
            background-color: #\${primaryColor};
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 45px;
            height: 45px;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.2) 0px 2px 12px;
            transition: transform 0.15s ease-in;
          }

          #bot-chat:hover {
            transform: scale(1.1);
          }

          #bot-chat:focus {
            outline: none;
          }

          #loader {
            background-color: rgba(0, 0, 0, 0.9);
            position: absolute;
            bottom: 90px;
            right: 20px;
            justify-content: center;
            align-items: center;
            z-index: 20;
            border-radius: 10px;
            display: none;
          }

          #loader.show {
            display: flex;
          }

          @media screen and (max-width: 767px) {
            #main-container.open, #main-container.open .container {
              width: 100%;
              height: 100%;
            }

            #bot-chat, #iframe-container {
              right: 15px;
            }

            #iframe-container.narrow {
              width: 90%;
              height: 85%;
              bottom: 75px;
            }
          
            #iframe-container.wide {
              width: 100%;
              height: 100%;
              bottom: 0;
              right: 0;
              border-top-left-radius: 0;
              border-top-right-radius: 0;
            }
          }
        \`;

        document.head.appendChild(mainStyle);

        chatButton.addEventListener('click', function () {
          const iframeContainer = document.getElementById('iframe-container');
          const style = getComputedStyle(iframeContainer);
          const mainContainer = document.getElementById('main-container');

          if (style.getPropertyValue('visibility') === 'hidden') {
            iframeContainer.classList.add('show');
            mainContainer.classList.add('open');
            chatButton.innerHTML = closeIcon;
          } else {
            iframeContainer.classList.remove('show');
            mainContainer.classList.remove('open');
            chatButton.innerHTML = chatIcon;
          }
        });

        iframe.addEventListener('load', function () {
          setTimeout(() => {
            iframe.contentWindow.postMessage({ domain: domain }, appURL);
          }, 0);
        });

        window.addEventListener("message", onMessage, false);

        function onMessage(event) {
          if (event.origin === appURL) {
            if (event.data.func === 'toggleWidth') {
              toggleWidth();
            }
          }
        }

        function toggleWidth() {
          const iframeContainer = document.getElementById('iframe-container');

          if (iframeContainer.classList.contains('wide')) {
            iframe.contentWindow.postMessage({ view: 'narrow' }, appURL);
            iframeContainer.classList.remove('wide');
            iframeContainer.classList.add('narrow');
          } else {
            iframe.contentWindow.postMessage({ view: 'wide' }, appURL);
            iframeContainer.classList.remove('narrow');
            iframeContainer.classList.add('wide');
          }
        }
      }

      window.addEventListener('DOMContentLoaded', initializeChatWidget);

      let iOS = navigator.userAgent && /iPhone/.test(navigator.userAgent);
      if (iOS) {
        document.head.querySelector('meta[name="viewport"]').content = "width=device-width, initial-scale=1, maximum-scale=1";
      } else {
        document.head.querySelector('meta[name="viewport"]').content = "width=device-width, initial-scale=1";
      }
    })();
  `;

  return new NextResponse(widgetJs, {
    headers: {
      "Content-Type": "application/javascript",
    },
  });
}