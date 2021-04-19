import React from 'react';
import PropTypes from 'prop-types';
// import { Grid} from 'semantic-ui-react';

const Layout = (props) => {
	const { input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } } = props;

	return (
		<React.Fragment>
            
			<div {...dropzoneProps}>
				{/* <Grid columns='equal'> */}
					{/* <Grid.Row stretched > */}
                        {/* <div className="row"> */}
                        {/* <Card.Group itemsPerRow={6}> */}
                        {previews}
                        {/* </Card.Group> */}
					{/* </Grid.Row> */}
					{files.length < maxFiles && input}

					{files.length > 0 && submitButton}
				{/* </Grid> */}
			</div>
		</React.Fragment>
	);
};

Layout.propTypes = {
	input: PropTypes.node,
	previews: PropTypes.arrayOf(PropTypes.node),
	submitButton: PropTypes.node,
	dropzoneProps: PropTypes.shape({
		ref: PropTypes.any.isRequired,
		className: PropTypes.string.isRequired,
		style: PropTypes.object,
		onDragEnter: PropTypes.func.isRequired,
		onDragOver: PropTypes.func.isRequired,
		onDragLeave: PropTypes.func.isRequired,
		onDrop: PropTypes.func.isRequired
	}).isRequired,
	files: PropTypes.arrayOf(PropTypes.any).isRequired,
	extra: PropTypes.shape({
		active: PropTypes.bool.isRequired,
		reject: PropTypes.bool.isRequired,
		dragged: PropTypes.arrayOf(PropTypes.any).isRequired,
		accept: PropTypes.string.isRequired,
		multiple: PropTypes.bool.isRequired,
		minSizeBytes: PropTypes.number.isRequired,
		maxSizeBytes: PropTypes.number.isRequired,
		maxFiles: PropTypes.number.isRequired,
		onFiles: PropTypes.func.isRequired,
		onCancelFile: PropTypes.func.isRequired,
		onRemoveFile: PropTypes.func.isRequired,
		onRestartFile: PropTypes.func.isRequired
	}).isRequired
};

export default Layout;
