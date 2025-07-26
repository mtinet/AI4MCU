// admin.js - 보안 및 관리자 모듈
(function() {
    "use strict";

    // 보안 모듈
    const SecurityModule = {
        init: function() {
            this.disableRightClick();
            this.disableKeyShortcuts();
            this.disableTextSelection();
            this.disableDragDrop();
            this.setupConsoleWarning();
            this.detectDevTools();
        },
        
        disableRightClick: function() {
            document.addEventListener("contextmenu", function(e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }, true);
            
            document.addEventListener("mousedown", function(e) {
                if (e.button === 2) {
                    e.preventDefault();
                    return false;
                }
            }, true);
            
            document.addEventListener("mouseup", function(e) {
                if (e.button === 2) {
                    e.preventDefault();
                    return false;
                }
            }, true);

            document.oncontextmenu = function() { 
                return false; 
            };
        },
        
        disableKeyShortcuts: function() {
            document.addEventListener("keydown", function(e) {
                if (e.key === "F12" || 
                    e.keyCode === 123 ||
                    (e.ctrlKey && e.shiftKey && e.key === "I") ||
                    (e.ctrlKey && e.shiftKey && e.key === "J") ||
                    (e.ctrlKey && e.shiftKey && e.key === "C") ||
                    (e.ctrlKey && (e.key === "u" || e.key === "U")) ||
                    (e.ctrlKey && (e.key === "s" || e.key === "S"))) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
                
                if (e.ctrlKey && e.key === "a" && !e.shiftKey) {
                    e.preventDefault();
                    return false;
                }
            }, true);
        },
        
        disableTextSelection: function() {
            document.addEventListener("selectstart", function(e) {
                e.preventDefault();
                return false;
            }, true);
            
            document.onselectstart = function() { 
                return false; 
            };
            
            const style = document.createElement("style");
            style.innerHTML = `
                * {
                    -webkit-user-select: none !important;
                    -moz-user-select: none !important;
                    -ms-user-select: none !important;
                    user-select: none !important;
                    -webkit-touch-callout: none !important;
                    -webkit-tap-highlight-color: transparent !important;
                }
                input, textarea {
                    -webkit-user-select: text !important;
                    -moz-user-select: text !important;
                    -ms-user-select: text !important;
                    user-select: text !important;
                }
            `;
            document.head.appendChild(style);
        },
        
        disableDragDrop: function() {
            document.addEventListener("dragstart", function(e) {
                e.preventDefault();
                return false;
            }, true);
            
            document.addEventListener("drop", function(e) {
                e.preventDefault();
                return false;
            }, true);
        },
        
        setupConsoleWarning: function() {
            console.clear();
            console.log("%c⚠️ 보안 경고", "color: red; font-size: 30px; font-weight: bold;");
            console.log("%c이 기능은 개발자를 위한 것입니다.", "color: red; font-size: 16px;");
            
            setInterval(function() {
                console.clear();
                console.log("%c🚫 무단 접근 금지", "color: red; font-size: 20px; font-weight: bold;");
            }, 3000);
        },
        
        detectDevTools: function() {
            let devtools = false;
            const threshold = 160;
            
            setInterval(function() {
                if (window.outerHeight - window.innerHeight > threshold || 
                    window.outerWidth - window.innerWidth > threshold) {
                    if (!devtools) {
                        devtools = true;
                        console.clear();
                        console.log("%c개발자 도구가 감지되었습니다!", "color: red; font-size: 20px; font-weight: bold;");
                    }
                } else {
                    devtools = false;
                }
            }, 500);
        }
    };

    // 관리자 모듈
    const AdminModule = {
        config: {
            storageKey: "ai_edu_kit_visitor_log"
        },
        
        generateAdminKey: function() {
            // 고정된 관리자 코드
            return "admin7673";
        },
        
        verifyAdmin: function(inputKey) {
            return inputKey === this.generateAdminKey();
        },
        
        getVisitorLogs: function() {
            const logs = localStorage.getItem(this.config.storageKey);
            return logs ? JSON.parse(logs) : [];
        },
        
        downloadCSV: function() {
            const logs = this.getVisitorLogs();
            if (logs.length === 0) {
                alert("다운로드할 로그가 없습니다.");
                return;
            }
            
            const headers = ["번호", "날짜", "시간", "IP주소", "국가", "도시", "참조페이지", "방문자ID", "User Agent"];
            let csvContent = headers.join(",") + "\n";
            
            logs.forEach(function(log, index) {
                const row = [
                    index + 1,
                    '"' + log.date + '"',
                    '"' + log.time + '"',
                    '"' + log.ip + '"',
                    '"' + log.country + '"',
                    '"' + log.city + '"',
                    '"' + (log.referrer === "direct" ? "직접 접속" : log.referrer) + '"',
                    '"' + log.visitorId + '"',
                    '"' + log.userAgent + '"'
                ];
                csvContent += row.join(",") + "\n";
            });
            
            const blob = new Blob(["\uFEFF" + csvContent], { 
                type: "text/csv;charset=utf-8;" 
            });
            const link = document.createElement("a");
            
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", "ai_edu_kit_visitor_log_" + new Date().toISOString().split("T")[0] + ".csv");
                link.style.visibility = "hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }
        },
        
        showLogModal: function() {
            const logs = this.getVisitorLogs();
            const logContent = document.getElementById("logContent");
            
            if (!logContent) {
                alert("로그 컨테이너를 찾을 수 없습니다.");
                return;
            }
            
            if (logs.length === 0) {
                logContent.innerHTML = '<p class="text-gray-500 text-center py-8">아직 방문 기록이 없습니다.</p>';
            } else {
                let logHtml = '<div class="mb-4 flex justify-between items-center">';
                logHtml += '<span class="text-sm text-gray-600">총 ' + logs.length + '개의 방문 기록</span>';
                logHtml += '<span class="text-xs text-gray-500">최근 업데이트: ' + new Date().toLocaleString("ko-KR") + '</span>';
                logHtml += '</div>';
                logHtml += '<div class="overflow-x-auto">';
                logHtml += '<table class="w-full border-collapse border border-gray-200">';
                logHtml += '<thead>';
                logHtml += '<tr class="bg-gray-100">';
                logHtml += '<th class="border border-gray-200 px-2 py-2 text-left text-xs">번호</th>';
                logHtml += '<th class="border border-gray-200 px-2 py-2 text-left text-xs">날짜</th>';
                logHtml += '<th class="border border-gray-200 px-2 py-2 text-left text-xs">시간</th>';
                logHtml += '<th class="border border-gray-200 px-2 py-2 text-left text-xs">IP</th>';
                logHtml += '<th class="border border-gray-200 px-2 py-2 text-left text-xs">국가</th>';
                logHtml += '<th class="border border-gray-200 px-2 py-2 text-left text-xs">도시</th>';
                logHtml += '<th class="border border-gray-200 px-2 py-2 text-left text-xs">참조</th>';
                logHtml += '</tr>';
                logHtml += '</thead>';
                logHtml += '<tbody>';
                
                const displayLogs = logs.slice(-100).reverse();
                displayLogs.forEach(function(log, index) {
                    const rowClass = index % 2 === 0 ? "bg-white" : "bg-gray-50";
                    logHtml += '<tr class="' + rowClass + ' hover:bg-blue-50">';
                    logHtml += '<td class="border border-gray-200 px-2 py-1 text-xs">' + (logs.length - index) + '</td>';
                    logHtml += '<td class="border border-gray-200 px-2 py-1 text-xs">' + log.date + '</td>';
                    logHtml += '<td class="border border-gray-200 px-2 py-1 text-xs">' + log.time + '</td>';
                    logHtml += '<td class="border border-gray-200 px-2 py-1 text-xs font-mono">' + log.ip + '</td>';
                    logHtml += '<td class="border border-gray-200 px-2 py-1 text-xs">' + log.country + '</td>';
                    logHtml += '<td class="border border-gray-200 px-2 py-1 text-xs">' + log.city + '</td>';
                    logHtml += '<td class="border border-gray-200 px-2 py-1 text-xs truncate max-w-32" title="' + log.referrer + '">' + (log.referrer === "direct" ? "직접" : log.referrer) + '</td>';
                    logHtml += '</tr>';
                });
                
                logHtml += '</tbody></table></div>';
                if (logs.length > 100) {
                    logHtml += '<p class="text-xs text-gray-500 mt-2 text-center">최근 100개 기록만 표시됩니다. 전체 로그는 CSV 다운로드를 이용하세요.</p>';
                }
                logContent.innerHTML = logHtml;
            }
            
            const modal = document.getElementById("logModal");
            if (modal) {
                modal.style.display = "flex";
            }
        },
        
        getStats: function() {
            const logs = this.getVisitorLogs();
            const today = new Date().toLocaleDateString("ko-KR");
            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            
            return {
                total: logs.length,
                today: logs.filter(function(log) { return log.date === today; }).length,
                thisWeek: logs.filter(function(log) { 
                    return new Date(log.timestamp) >= weekAgo; 
                }).length,
                unique: new Set(logs.map(function(log) { return log.visitorId; })).size,
                countries: new Set(logs.map(function(log) { return log.country; })).size
            };
        },
        
        init: function() {
            const self = this;
            
            document.addEventListener("keydown", function(e) {
                if (e.ctrlKey && e.shiftKey && e.key === "A") {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const inputKey = prompt("🔐 오늘의 관리자 인증 코드를 입력하세요:");
                    if (self.verifyAdmin(inputKey)) {
                        const adminPanel = document.getElementById("adminPanel");
                        if (adminPanel) {
                            adminPanel.classList.remove("hidden");
                            alert("✅ 관리자 모드가 활성화되었습니다.");
                            console.clear();
                            console.log("%c관리자 모드 활성화", "color: green; font-size: 16px; font-weight: bold;");
                        }
                    } else if (inputKey) {
                        alert("❌ 잘못된 인증 코드입니다.");
                        console.clear();
                        console.log("%c잘못된 접근 시도", "color: red; font-size: 14px;");
                    }
                }
            });
            
            const showLogBtn = document.getElementById("showLogBtn");
            const downloadLogBtn = document.getElementById("downloadLogBtn");
            
            if (showLogBtn) {
                showLogBtn.addEventListener("click", function(e) {
                    e.preventDefault();
                    self.showLogModal();
                });
            }
            
            if (downloadLogBtn) {
                downloadLogBtn.addEventListener("click", function(e) {
                    e.preventDefault();
                    self.downloadCSV();
                });
            }
        },
        
        getAdminCode: function() {
            return this.generateAdminKey();
        }
    };

    // 추가 보안
    window.eval = function() {
        throw new Error("eval() 함수는 보안상 비활성화되었습니다.");
    };

    // 모듈 초기화
    if (typeof window !== "undefined") {
        SecurityModule.init();
        
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", function() {
                AdminModule.init();
            });
        } else {
            AdminModule.init();
        }
        
        setTimeout(function() {
            console.clear();
            console.log("%c🔑 관리자 코드 (고정)", "color: blue; font-size: 14px; font-weight: bold; background: lightblue; padding: 2px 8px;");
            console.log("%cadmin7673", "color: blue; font-size: 16px; font-weight: bold; background: yellow; padding: 4px 8px;");
            console.log("%cCtrl+Shift+A 키로 관리자 패널을 활성화하세요.", "color: gray; font-size: 12px;");
            
            const stats = AdminModule.getStats();
            console.log("%c📊 현재 통계", "color: green; font-size: 12px; font-weight: bold;");
            console.table(stats);
        }, 1000);
        
        window.AdminModule = AdminModule;
    }

})();