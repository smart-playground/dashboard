import React, { useState } from 'react';

/**
 * We create our recipe context
 * @type {React.Context<{removeRecipe: (function(): *), recipes: [], addRecipe: (function(): *)}>}
 */
const GenericFilterContext = React.createContext({
    start: null,
    end: null,
    minCharge: null,
    maxCharge: null,
    tags: [],
    text: "",
    inOut: null,

    setChargeRange: (min) => console.error("Please implement this function."),
    resetChargeRange: () => console.error("Please implement this function."),

    setElementsTags: (tags) => console.error("Please implement this function."),
    resetElementsTags: () => console.error("Please implement this function."),

    setDates: (range) => console.error("Please implement this function."),
    resetDates: () => console.error("Please implement this function."),

    setInOut: (range) => console.error("Please implement this function."),
    resetInOut: () => console.error("Please implement this function."),
});


/**
 * We make component for manage business logic between children components and context
 * @param children
 * @returns {*}
 * @constructor
 */
const GenericFilterContextProvider = ({ children }) => {
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    const [minCharge, setMinCharge] = useState(null);
    const [maxCharge, setMaxCharge] = useState(null);

    const [tags, setTags] = useState([]);

    const [text, setText] = useState("");

    const [inOut, setInOut] = useState(0);


    /**
     * Callback when user add new recipe into recipes list
     * @param recipe
     */
    const setDates = (range) => {
        console.log('GenericFilterContext Range !', range);
        setStart(range[0]);
        setEnd(range[1]);
    }

    /**
     * Callback when user remove recipe into recipes list
     * @param recipeId
     */
    const resetDates = () => {
        console.log('reset dates')
        setStart(null);
        setEnd(null);    
    }

    const setChargeRangeMin = (min) => {
        console.log('GenericFilterContext min !', min);
        setMinCharge(min)
    }

    const resetChargeRangeMin = () => {
        console.log('reset min')
        setMinCharge(null);
    }

    const setChargeRangeMax = (max) => {
        console.log('GenericFilterContext max !', max);
        setMaxCharge(max);
    }

    const resetChargeRangeMax = () => {
        console.log('reset max')
        setMaxCharge(null);
    }

    const setElementsTags = (tags) => {
        console.log('GenericFilterContext tags !', tags);
        setTags(tags);
    }

    /**
     * Callback when user remove recipe into recipes list
     * @param recipeId
     */
    const resetElementsTags = () => {
        console.log('reset tags')
        setTags([]);
    }

    const setTextSearch = (text) => {
        console.log('GenericFilterContext text !', text);
        setText(text);
    }

    /**
     * Callback when user remove recipe into recipes list
     * @param recipeId
     */
    const resetTextSearch = () => {
        console.log('reset text')
        setText("");
    }

    const setInOutToggle = (inOut) => {
        console.log('GenericFilterContext inOut !', inOut);
        setInOut(inOut);
    }

    const resetInOutToggle = () => {
        console.log('reset tags')
        setInOut(0);
    }


    return (
        <GenericFilterContext.Provider value={{
            start, end, setDates, resetDates, 
            minCharge, maxCharge,
            setChargeRangeMin, resetChargeRangeMin,
            setChargeRangeMax, resetChargeRangeMax,
            tags, setElementsTags, resetElementsTags,
            inOut, setInOutToggle, resetInOutToggle,
            text, setTextSearch, resetTextSearch
        }}>
            {children}
        </GenericFilterContext.Provider>
    )
}


// export default GenericFilterContext;
// export { GenericFilterContextProvider };
export { GenericFilterContext, GenericFilterContextProvider };