const paginate = (image, title) => {
  return (
    <div className="institute-card">
        <img src={image} alt={title} />
        <h3>{title}</h3>
    </div>
  )
}
const InstituteCard = ({ image, title }) => paginate(image, title);

export default InstituteCard;
