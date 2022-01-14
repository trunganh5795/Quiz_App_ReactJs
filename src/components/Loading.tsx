import React from 'react'

const Loading: React.FC = (props) => {
    return (
        <div id="preloader">
            <div id="loader">
                <div className="line-scale-pulse-out">
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </div>
        </div>
    )
}
export default Loading;