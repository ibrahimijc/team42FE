import React, { Component, } from "react";
import PropTypes from "prop-types";
//import './autocoomplete.css';
import { connect } from 'react-redux';
import { searchMatric } from '../store/actions/templateActions';
import Noty from 'noty';

class MatricSearch extends Component {


    doParentToggleFromChild() {
        this.props.parentToggle(this.state.index, this.state.categoryIndex, this.state.selectedSuggestions)
    }

    constructor(props) {
        super(props);
        this.doParentToggleFromChild = this.doParentToggleFromChild.bind(this);
        this.state = {
            // The active selection's index
            suggestions: [],
            selected:false,
            index: this.props.index,
            categoryIndex: this.props.categoryIndex,
            activeSuggestion: 0,
            // The suggestions that match the user's input
            filteredSuggestions: [],
            selectedSuggestions: [],
            // Whether or not the suggestion list is shown
            showSuggestions: false,
            abd: "",
            // What the user has entered
            userInput: "",
            isLoading: false
        };
    }


    componentDidMount() {
        console.log(this.props.categoryIndex)
        this.setState({
            index: this.props.index,
            categoryIndex: this.props.categoryIndex,
            isLoading: true
        })
        this.props.searchMatric("").then((res) => {

            if (res.content != null && res.content.Matric) {
                this.setState({
                    suggestions: res.content.Matric,
                    activeSuggestion: 0,
                    filteredSuggestions: res.content.Matric,
                    showSuggestions: true,
                });
            }

            this.setState({ isLoading: false })
        }).catch((err) => {
            this.setState({ isLoading: false })
        })


    }

    onChange = e => {


        const { suggestions } = this.state;
        const userInput = e.currentTarget.value;


        this.props.searchMatric(userInput).then((res) => {

            if (res.content != null && res.content.Matric) {
//                this.setState({ suggestions: res.content.Matric })


            }

            this.setState({ isLoading: false })
        }).catch((err) => {
            this.setState({ isLoading: false })
        })

        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions = suggestions.filter(
            suggestion =>
                suggestion.MatricsName.toLowerCase().indexOf(userInput.toLowerCase()) > -1 ||
                suggestion.Description && suggestion.Description.toLowerCase().indexOf(userInput.toLowerCase()) >-1 ||
                suggestion.SourceName && suggestion.SourceName.toLowerCase().indexOf(userInput.toLowerCase()) >-1
        );


        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value,
            selected:false       

        });
    };

    onClick = (suggestion) => {
        console.log(suggestion.MatricsName)


        this.setState({ selectedSuggestions: suggestion }, () => {
            this.doParentToggleFromChild()
        });

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: suggestion.MatricsName,
            selected:true

        });


    };



    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        // User pressed the enter key
        if (e.keyCode === 13) {

            this.setState({ selectedSuggestions: filteredSuggestions[activeSuggestion] }, () => {
                this.doParentToggleFromChild()
            });

            this.setState({
                activeSuggestion: 0,
                filteredSuggestions: [],
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion].MatricsName,
                selected:true
            });
        }

        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === this.state.filteredSuggestions.length) {
                return
            }

            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput,
                selectedSuggestions, isLoading
            }

        } = this;

        let suggestionsListComponent;

        if (!isLoading) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <div className="marginrr   col-sm-12  m-0 mt-2" >
                        <div className="table-responsive ">
                            <table className="table table-hover thead-primary  ">
                                <thead>
                                    <tr>

                                        <th scope="col">Metric Name</th>
                                        <th scope="col">Description </th>
                                        <th scope="col">Source Name</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {filteredSuggestions.map((suggestion, index) => {
                                        let className;
                                        if (index === activeSuggestion)
                                            className = "suggestion-active";
                                        return (

                                            <tr className={className} key={suggestion.MatricId} onClick={(e) => onClick(suggestion)} >
                                                <td> {suggestion.MatricsName}</td>
                                                <td> {suggestion.Description}</td>
                                                <td> {suggestion.SourceName}</td>
                                            </tr>

                                        );
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>);
            } else {
                suggestionsListComponent = (
                    
                     
                   !this.state.selected && <div className="col-md-12 col-xs-12 p-0 m-0 mt-2 no-suggestions ">
                        <em>No Metric match</em>
                    </div>
                 
                );
            }
        } else {
            suggestionsListComponent = (
                <div className="search-dropdown-container  ">
                    <div className='loader-large'> </div>
                </div>
            );
        }

        return (


            <div className="">
                <input
                    type="text" className="input-text  m-0 col-sm-12" placeholder="Search Metric"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                />
                {suggestionsListComponent}
            </div>

        );
    }
}

const mapStateToProps = state => ({

});
const mapDispatchToProps = ({

    searchMatric
})
export default connect(
    mapStateToProps, mapDispatchToProps
)(MatricSearch)