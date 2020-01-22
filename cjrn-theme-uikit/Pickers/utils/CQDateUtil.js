

/**
 * 日期器的选择样式
 */
export var CQDatePickShowType = {
    yyyyMMdd: 0,        /** 只显示年月日 */
    yyyyMMddHHmm: 1,    /** 只显示年月日时分 */
    yyyyMMddHHmmss: 2,  /** 只显示年月日时分秒 */
    yyyyMM: 3,          /** 只显示年月(目前2019.07.06不支持) */
    HHmm:4,             /** 只显示时分(目前2019.07.06不支持) */
    HHmmss:5           /** 只显示时分秒(目前2019.07.06不支持) */
};

export default class CQDateUtil {
    /**
     * 去除单位
     * @param fullString
     * @param unitString
     * @returns {string}
     */
    static removeUnit(fullString, unitString){
        // lastString = fullString.substr(0, fullString.length - unitString.length);
        return fullString.split(unitString)[0];
    }
     /**
     * 根据picker选中的数组值，得到日期字符串(形如'2000-02-29')
     * @param pickedValue
     * @returns {string}
     */
     static getFormatDateString = (pickedValue, datePickShowType) => {

        let year = pickedValue[0];
        let date = new Date();
        if (year == -1) {
            year = date.getFullYear()
        }

        let month = pickedValue[1];
        if (month == -1) {
            month = date.getMonth() + 1
        }
        month = month < 10 ? ('0' + month) : month;

        let day = pickedValue[2];
        if (day == -1) {
             day = date.getDay()
         }
         day = day < 10 ? ('0' + day) : day;

        let hour = '00';
        if (pickedValue.length > 3) {
            hour = pickedValue[3];
            if (hour == -1) {
                hour = date.getHours()
            }
            hour = hour < 10 ? ('0' + hour) : hour;
        }

        let minute = '00';
        if (pickedValue.length > 4) {
            minute = pickedValue[4];
            if (minute == -1) {
                minute = date.getMinutes()
            }
            minute = minute < 10 ? ('0' + minute) : minute;
        }


        let second = '00';
        if (pickedValue.length > 5) {
            second = pickedValue[5];
            if (second == -1) {
                second = date.getSeconds()
            }
            second = second < 10 ? ('0' + second) : second;
        }

         if (datePickShowType === CQDatePickShowType.HHmm ||
             datePickShowType === CQDatePickShowType.HHmmss){
             hour = pickedValue[0];
             if (hour == -1) {
                 hour = date.getHours()
             }
             hour = hour < 10 ? ('0' + hour) : hour;
             minute = pickedValue[1];
             if (minute == -1) {
                 minute = date.getMinutes()
             }
             minute = minute < 10 ? ('0' + minute) : minute;
             if (datePickShowType === CQDatePickShowType.HHmmss) {
                 second = pickedValue[2];
                 if (second == -1) {
                     second = date.getSeconds()
                 }
                 second = second < 10 ? ('0' + second) : second;
             }
         }

        let dateString;
        switch (datePickShowType) {
            case CQDatePickShowType.yyyyMMdd: {
                dateString = year + '-' + month + '-' + day;
                break;
            }
            case CQDatePickShowType.yyyyMMddHHmm: {
                dateString = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
                break;
            }
            case CQDatePickShowType.yyyyMMddHHmmss: {
                dateString = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
                break;
            }
            case CQDatePickShowType.yyyyMM: {
                dateString = year + '-' + month;
                break;
            }
            case CQDatePickShowType.HHmm: {
                dateString = hour + ':' + minute;
                break;
            }
            case CQDatePickShowType.HHmmss: {
                dateString = hour + ':' + minute + ':' + second;
                break;
            }
            default: {
                dateString = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
                break;
            }
        }

        return dateString;
    }


    /**
     * 日期字符串转换为值数组
     * @param dateString
     * @param datePickShowType
     * @returns {string[]}
     */
    static getValuesFromString(dateString, datePickShowType) {
        if (datePickShowType === CQDatePickShowType.HHmm ||
            datePickShowType === CQDatePickShowType.HHmmss) {
            if (dateString == null || dateString === "") {
                let date = new Date()
                return [date.getHours(), date.getMinutes(), date.getSeconds()];
            }

            let valueStrings = dateString.split(":");
            let values = [];
            for (let index = 0; index < valueStrings.length; index++ ) {
                let valueString = valueStrings[index];
                let value = parseInt(valueString);
                values.push(value)
            }
            return values;
        } else {
            let date = this._yyyyMMdd_hhmmssDate(dateString);
            return this.getValuesFromDate(date, datePickShowType);
        }

    }


    /**
     * 更新默认选中的日期
     * @param defaultSelectedDate
     * @param datePickShowType
     */
    static getValuesFromDate(defaultSelectedDate, datePickShowType) {
        if (defaultSelectedDate == null) {
            defaultSelectedDate = new Date();
        }
        return this._getSelectedValue(defaultSelectedDate, datePickShowType);
    }

    /**
     * 创建日期
     * @param fullDateString    将形如'2017-06-28 10:48:46'转成date类
     * @returns Date
     */
    static _yyyyMMdd_hhmmssDate(fullDateString) {
        if (fullDateString) {
            let regEx = new RegExp("\\-", "gi");
            let validDateStr = fullDateString.replace(regEx, "/");
            let milliseconds = Date.parse(validDateStr);
            return new Date(milliseconds);
        }
        return null;
    }


    /**
     * 获取选定指定日期(如'2000-02-29')时候，picker所要选中的数组值
     * @param date                  选中的日期
     * @param datePickShowType      日期类型
     * @returns {string[]}
     */
    static _getSelectedValue = (date, datePickShowType) => {
        let selectedValue = [];

        let year = date.getFullYear();
        selectedValue.push(year);

        let month = date.getMonth()+1;
        //month = month < 10 ? ('0' + month) : month;
        selectedValue.push(month);


        if (datePickShowType === CQDatePickShowType.yyyyMMdd ||
            datePickShowType === CQDatePickShowType.yyyyMMddHHmm ||
            datePickShowType === CQDatePickShowType.yyyyMMddHHmmss) {
            let day = date.getDate();
            //day = day < 10 ? ('0' + day) : day;
            selectedValue.push(day);
        }

        if (datePickShowType === CQDatePickShowType.yyyyMMddHHmm ||
            datePickShowType === CQDatePickShowType.yyyyMMddHHmmss ||
            datePickShowType === CQDatePickShowType.HHmm) {
            let hours = date.getHours();
            hours = hours < 10 ? ('0' + hours) : hours;
            selectedValue.push(hours);
        }

        if (datePickShowType === CQDatePickShowType.yyyyMMddHHmm ||
            datePickShowType === CQDatePickShowType.yyyyMMddHHmmss ||
            datePickShowType === CQDatePickShowType.HHmmss) {
            let minutes = date.getMinutes();
            minutes = minutes < 10 ? ('0' + minutes) : minutes;
            selectedValue.push(minutes);
        }

        if (datePickShowType === CQDatePickShowType.yyyyMMddHHmmss ||
            datePickShowType === CQDatePickShowType.HHmmss) {
            let seconds = date.getSeconds();
            seconds = seconds < 10 ? ('0' + seconds) : seconds;
            selectedValue.push(seconds);
        }

        return selectedValue;
    };


    /**
     * 获取时间单位为yMdUnits，范围从startYear到endYear中，选择yMdSelectedValues时候的日期信息
     * @param startYear             起始的年
     * @param endYear               结束的年
     * @param yMdSelectedValues     选择的年月日
     * @param yMdUnits              年月日的单位
     */
    static yearMonthDayDatas(startYear, endYear, yMdSelectedValues, yMdUnits) {
        let yearMonthDayDatas = {};

        // 年
        let years = [];
        for (let i = 0; i < endYear + 1 - startYear; i++) {
            years.push(i + startYear + yMdUnits[0]);
        }

        let selectedYear = this.removeUnit(years[0], yMdUnits[0]);
        if (yMdSelectedValues) {
            selectedYear = yMdSelectedValues[0];
        }

        let yearSelectedIndex = years.indexOf(selectedYear + yMdUnits[0]) === -1 ? years.length - 1 : years.indexOf(selectedYear + yMdUnits[0]);

        let yearDict = {
            'years': years,
            'yearSelectedValue': selectedYear,
            'yearSelectedIndex': yearSelectedIndex,
        };
        Object.assign(yearMonthDayDatas, yearDict);


        // 月
        let months = [];
        for (let i = 1; i < 13; i++) {
            months.push(i + yMdUnits[1]);
        }

        let selectedMonth = this.removeUnit(months[0], yMdUnits[1]);
        if (yMdSelectedValues) {
            selectedMonth = yMdSelectedValues[1];
        }

        let monthSelectedIndex = months.indexOf(selectedMonth + yMdUnits[1]);

        let monthDict = {
            'months': months,
            'monthSelectedValue': selectedMonth,
            'monthSelectedIndex': monthSelectedIndex,
        };
        Object.assign(yearMonthDayDatas, monthDict);

        return yearMonthDayDatas;
    }
}
