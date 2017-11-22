
export class Article {
  public id: number;
  public title: string;
  public resume: string;
  public description: string;
  public category: string;
  public imgPath: string;
  public owner: string;
  public date: number;

  constructor(id: number,
              title: string,
              resume: string,
              description: string,
              category: string,
              imgPath: string,
              owner: string,
              date: number) {
    this.id = id;
    this.title = title;
    this.resume = resume;
    this.description = description;
    this.category = category;
    this.imgPath = imgPath;
    this.owner = owner;
    this.date = date;
  }
}
