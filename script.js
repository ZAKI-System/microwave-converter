let InputWatt;
let InputMin;
let InputSec;
let OutputWatt;
let OutputMin;
let OutputSec;

document.addEventListener("DOMContentLoaded", () => {
    InputWatt = document.getElementById("InputWatt");
    InputMin = document.getElementById("InputMin");
    InputSec = document.getElementById("InputSec");
    OutputWatt = document.getElementById("OutputWatt");
    OutputMin = document.getElementById("OutputMin");
    OutputSec = document.getElementById("OutputSec");
});

function Page_Load() {

}

function ShowLog(message) {
    StatusLabel.textContent = message;
}

function ClearAll() {
    InputWatt.value = "600";
    InputMin.value = "3";
    InputSec.value = "20";
    OutputWatt.value = "800";
    OutputMin.value = "?";
    OutputSec.value = "?";

    ShowLog("最初の状態に戻しました");
}

function CalcButton_Click() {
    // 入力の数値化と範囲チェック
    let inputWatt;
    let inputMin;
    let inputSec;
    if (InputWatt.value.trim() != "" && (inputWatt = Number(InputWatt.value)) != NaN) {
        if (inputWatt <= 0) {
            ShowLog("[！]: 変換前のW数は1以上を入力してください");
            return;
        }
    } else {
        //watt error
        ShowLog("[！]: 変換前のW数に整数以外が入力されています");
        return;
    }
    if (InputMin.value.trim() != "" && (inputMin = Number(InputMin.value)) != NaN) {
        if (inputMin < 0) {
            ShowLog("[！]: 「分」は0以上を入力してください");
            return;
        }
    } else {
        //min error
        ShowLog("[！]: 「分」に整数以外が入力されています");
        return;
    }
    if (InputSec.value.trim() != "" && (inputSec = Number(InputSec.value)) != NaN) {
        if (inputSec < 0 || 60 <= inputSec) {
            ShowLog("[！]: 「秒」は0～59の範囲で入力してください");
            return;
        }
    } else {
        //sec error
        ShowLog("[！]: 「秒」に整数以外が入力されています");
        return;
    }
    
    let outputWatt;
    if (OutputWatt.value.trim() != "" && (outputWatt = Number(OutputWatt.value)) != NaN) {
        if (outputWatt <= 0) {
            ShowLog("[！]: 変換後のW数は1以上を入力してください");
            return;
        }
    } else {
        //watt error
        ShowLog("[！]: 変換後のW数に整数以外が入力されています");
        return;
    }

    // 変換前の総秒数
    let inputAllSec = inputMin * 60 + inputSec;
    // ShowLog(inputAllSec.ToString());

    // 必要熱量
    let joule = inputWatt * inputAllSec;
    // ShowLog(joule.ToString());

    // 変換後の総秒数
    let outputAllSec = joule / outputWatt;
    // ShowLog(outputAllSec.ToString());

    // 変換後の分と秒
    let outputMin = Math.floor(outputAllSec / 60);
    let outputSec = outputAllSec % 60;

    // 出力
    OutputMin.value = outputMin.toString();
    OutputSec.value = outputSec.toString();
    if (outputMin >= 0 && outputSec >= 0) {
        ShowLog("計算が完了しました");
    } else {
        ShowLog("オーバーフローが発生してしまいました: 入力が大きすぎます");
    }
}

function ClearButton_Click() {
    ClearAll();
}
