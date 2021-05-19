import React from "react";

class IntersectionObserverComponent extends React.PureComponent {
    componentDidMount() {
        const { rootClass, rootMargin, src } = this.props;
        const options = {
            root: rootClass ? document.querySelector('.' + rootClass) : null,
            rootMargin: rootMargin || "0px 0px 0px 0px"
        };
        this.observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    this.element.src = src;
                    this.observer = this.observer.disconnect();
                }
            }, options);
        this.observer.observe(this.element);
    }
    render() {
        const { alt, style, className } = this.props;
        const attr = { alt, style, className };
        return <img ref={el => this.element = el} {...attr} />;
    }
}

export default IntersectionObserverComponent;